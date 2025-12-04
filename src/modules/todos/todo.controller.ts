import { Request, Response } from "express";
import { todosService } from "./todos.service";
import { pool } from "../../config/db";


const creactTodo=async(req:Request,res:Response)=>{
  const {user_id,title}=req.body;
  try {
    const result=await todosService.postTodoDB(user_id,title)
      
    res.status(201).json({
      sucess:true,
      message:"Todo Creceted",
      data:result.rows[0]
    })
  
  } catch (error:any) {
        res.status(500).json({
      sucess:false,
      message:error.message
    })
  }
}

const getTodos=async(req:Request,res:Response)=>{
 try {
  const result= await todosService.getTodosDB()
  res.status(200).json({
    sucess:true,
    message:"all get todos sucessfully",
    data:result.rows
  })
 } catch (error:any) {
     res.status(500).json({
      sucess:false,
      message:error.message
    })
 }
}

const getSingleTodo=async(req:Request,res:Response)=>{
  try {
    const result=await todosService.getSingleTodoDB(req)
    if(result.rows.length===0){
      res.status(404).json({
      sucess:false,
      message:'user not found'
       })
    }else{
      res.status(200).json({
        sucess:true,
        mesage:"get single todos sucessfully",
        data:result.rows[0]
      })
    }
  } catch (error:any) {
       res.status(500).json({
      sucess:false,
      message:error.message
    })
  }
}

const updateTodo=async(req:Request,res:Response)=>{
  const {title}=req.body;
  try {
    const result=await todosService.updateTodoDB(title,req)
    if(result.rows.length===0){
      res.status(404).json({
      sucess:false,
      message:'todos not found'
       })
    }else{
      res.status(200).json({
        sucess:true,
        mesage:"todos updated sucessfully",
        data:result.rows[0]
      })
    }
  } catch (error:any) {
       res.status(500).json({
      sucess:false,
      message:error.message
    })
  }
}

const deletTodo=async(req:Request,res:Response)=>{
  try {
    const result=await todosService.deleteTodoDB(req)
    if(result.rowCount===0){
      res.status(404).json({
      sucess:false,
      message:'todos not found'
       })
    }else{
      res.status(200).json({
        sucess:true,
        messsage:"todos delete sucessfully",
        data:null
      })
    }
  } catch (error:any) {
       res.status(500).json({
      sucess:false,
      message:error.message
    })
  }
}

export const todosController={
    creactTodo,
    getTodos,
    getSingleTodo,
    updateTodo,
    deletTodo,
}

