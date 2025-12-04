import { Request, Response } from "express";
import { authservices } from "./auth.service";


const loginUser=async(req:Request,res:Response)=>{
const {email,password,role}=req.body;
try {
  const result=await authservices.loginUser(email,password,role)
  res.status(201).json({
    sucess:true,
    data:result
  })  
} catch (error:any) {
    res.status(500).json({
        sucess:false,
        message:error.message
    })
}
}

export const authController={
    loginUser
}