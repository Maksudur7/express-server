import express, { Request, Response } from 'express';
import { userControllers } from './user.controller';
const Router = express.Router();
Router.post("/", userControllers.createUser)  //done
Router.get("/", userControllers.getUser)
Router.get("/:id",userControllers.getSingleUser)
Router.put("/:id", userControllers.updateUser)
Router.delete("/:id", userControllers.deletUser)
export const userRoutes = Router;