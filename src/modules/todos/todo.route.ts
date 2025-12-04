import express from "express";
import { todosController } from "./todo.controller";

const router=express.Router()

 router.post('/',todosController.creactTodo)
 router.get('/',todosController.getTodos)
 router.get('/:id',todosController.getSingleTodo)
 router.put('/:id',todosController.updateTodo)
 router.delete('/:id',todosController.deletTodo)

export const todosRoute= router;
