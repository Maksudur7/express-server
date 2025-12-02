import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
//parser
const port = 5000;
app.use(express.json())
// app.use(express.urlencoded())
// database holo neon 
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        update_at TIMESTAMP DEFAULT NOW()
        )
        `)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description  TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        update_at TIMESTAMP DEFAULT NOW()
        )
        `)
}
initDB();

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} \n`);
    next()
}

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Maksudur')
})

//post users crad
app.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {

        const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email])
        res.status(201).json({
            success: true,
            message: "Data inseart successfully",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//users fetch
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`)
        res.status(200).json({
            success: true,
            message: "Users reatrived successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})

//user id fetch
app.get("/users/:id", async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})
app.put("/users/:id", async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { name, email } = req.body;
    try {
        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING * `, [name, email, req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id])
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User Deleted successfully",
                data: null
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})

// hw for todo table

app.get("/todos", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM todos`)
        res.status(200).json({
            success: true,
            message: "todos reatrived successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})

app.put("/todos/:id", async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { title, completed } = req.body;
    try {
        const result = await pool.query(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING * `, [title, completed, req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "todos not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "todos updated successfully",
                data: result.rows[0]
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})
app.delete("/todos/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`DELETE FROM todos WHERE id = $1 RETURNING`, [req.params.id])
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "todos not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "todos Deleted successfully",
                data: null
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err
        })
    }
})

// 404 handel kora
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
