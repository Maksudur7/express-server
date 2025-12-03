import { Request, Response } from "express"
import { todoServices } from "./todo.services"

const createtTodo = async (req: Request, res: Response) => {


    try {

        const result = await todoServices.createtTodo(req.body)
            res.status(201).json({
                success: true,
                message: "Data inseart successfully",
                data: result.rows[0]
            })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo();
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
}

const updateTodo = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { title, completed } = req.body;
    try {
        const result = await todoServices.updateTodo(title, completed, req.params.id!)
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
}

const deletTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.deletTodo(req.params.id!)
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
}

export const todoControllers = {
    getTodo,
    updateTodo,
    deletTodo,
    createtTodo
}