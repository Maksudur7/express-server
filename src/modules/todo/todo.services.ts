import { pool } from "../../config/db"

const createtTodo = async (payload : Record<string, unknown>)=>{
    const {user_id, title} = payload;
    const retult = pool.query( `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title])
    return retult
}

const getTodo = async ()=>{
    const result = await pool.query(`SELECT * FROM todos`)
    return result;
}

const updateTodo = async (title: string, completed: boolean, id: string) =>{
    const result = pool.query(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING * `, [title, completed, id])
    return result
}

const deletTodo = async (id: string)=>{
    const result = pool.query(`DELETE FROM todos WHERE id = $1 RETURNING`, [id])
    return result;
}

export const todoServices = {
    getTodo,
    updateTodo,
    deletTodo,
    createtTodo
}