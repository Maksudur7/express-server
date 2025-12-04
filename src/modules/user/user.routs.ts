import express, { Request, Response } from 'express';
import { userControllers } from './user.controller';
import auth from '../../middleware/auth';
const Router = express.Router();
Router.post("/", userControllers.createUser)  //done
Router.get("/", auth("Admin"), userControllers.getUser)
Router.get("/:id", auth("admin", "user"), userControllers.getSingleUser)
Router.put("/:id", userControllers.updateUser)
Router.delete("/:id", userControllers.deletUser)
export const userRoutes = Router;