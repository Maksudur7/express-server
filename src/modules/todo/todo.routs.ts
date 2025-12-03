import express from 'express';
import { todoControllers } from './todo.controller';
const Router = express.Router()

Router.get("/", todoControllers.getTodo)
Router.put("/:id", todoControllers.updateTodo)
Router.delete("/:id", todoControllers.deletTodo)
Router.post("/", todoControllers.createtTodo)

export const todoRouter = Router;