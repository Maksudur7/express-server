import { Request, Response } from "express";
import { userServices } from "./user.service";

// post route

const createUser = async (req: Request, res: Response) => {


    try {

        const result = await userServices.createUser(req.body)
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

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser()
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
}

const getSingleUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await userServices.getSingleUser(req.params.id!)
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
}

const updateUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { name, email } = req.body;
    try {
        const result = await userServices.updateUser(name, email, req.params.id!)
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
}

const deletUser =  async (req: Request, res: Response) => {
    try {
        const result = await userServices.deletUser(req.params.id !)
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
}
export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deletUser
}