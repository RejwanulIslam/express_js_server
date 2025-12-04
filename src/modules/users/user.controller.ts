import { Request, Response } from "express"
import { userService } from "./user.service"

const creactUser=async (req: Request, res: Response) => {

  try {
    const result =await userService.creactUserDB(req.body )

      res.status(201).json({
      sucess:true,
      message:"Data insurt successfull",
      data:result.rows[0]
    })
  } catch (error:any) {
    res.status(500).json({
      sucess:false,
      message:error.message
    })
  }
 
}


const getUser=async(req:Request,res:Response)=>{
 try {
  const result= await userService.getUserDB()
  res.status(200).json({
    sucess:true,
    message:"all get user sucessfully",
    data:result.rows
  })
 } catch (error:any) {
     res.status(500).json({
      sucess:false,
      message:error.message
    })
 }
}

const getSingleUser=async(req:Request,res:Response)=>{
  try {
    const result=await userService.getSingleUserDB(req)
    if(result.rows.length===0){
      res.status(404).json({
      sucess:false,
      message:'user not found'
       })
    }else{
      res.status(200).json({
        sucess:true,
        mesage:"user refeatch sucessfully",
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

const updateUser=async(req:Request,res:Response)=>{
  const {name,email}=req.body;
  try {
    const result=await userService.updateUserDB(name,email,req)
    if(result.rows.length===0){
      res.status(404).json({
      sucess:false,
      message:'user not found'
       })
    }else{
      res.status(200).json({
        sucess:true,
        mesage:"user updated sucessfully",
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

const deleteUser=async(req:Request,res:Response)=>{
  try {
    const result=await userService.deleteUserDB(req)
    if(result.rowCount===0){
      res.status(404).json({
      sucess:false,
      message:'user not found'
       })
    }else{
      res.status(200).json({
        sucess:true,
        messsage:"data delete sucessfully",
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

export const userController={
    creactUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
}