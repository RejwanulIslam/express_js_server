import express, { NextFunction, Request, Response } from "express"
import { Pool } from "pg"
import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
const port = 5000


// middle ware
app.use(express.json())


//  DB
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`
})

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(100)UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)

  await pool.query(`
         CREATE TABLE IF NOT EXISTS todos(
         id SERIAL PRIMARY KEY,
         user_id INT REFERENCES users(id) ON DELETE CASCADE,
         title VARCHAR(200) NOT NULL,
         description TEXT,
         completed BOOLEAN DEFAULT false,
         due_date DATE,
         creacted_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW() 

         ) 
          `)
}

initDB()


// custom midleware
const loger=(req:Request,res:Response,next:NextFunction)=>{
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
}


app.get('/',loger, (req: Request, res: Response) => {
  res.send('Hello World!')
})

// user CRUD
app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body
  try {
    const result = await pool.query(`INSERT INTO users(name,email) VALUES($1,$2)
      RETURNING *`,[name,email])

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
 
})

 
app.get('/users', async(req:Request,res:Response)=>{
 try {
  const result= await pool.query(`SELECT * FROM users`)
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
})


app.get('/users/:id',async(req:Request,res:Response)=>{
  try {
    const result=await pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id])
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
})


app.put('/users/:id',async(req:Request,res:Response)=>{
  const {name,email}=req.body;
  try {
    const result=await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name,email,req.params.id])
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
})


app.delete('/users/:id',async(req:Request,res:Response)=>{
  try {
    const result=await pool.query(`DELETE FROM users WHERE id=$1`,[req.params.id])
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
})


// todos CRUD

app.post('/todos',async(req:Request,res:Response)=>{
  const {user_id,title}=req.body;
  try {
    const result=await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,[user_id,title])
      
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
})


app.get('/todos', async(req:Request,res:Response)=>{
 try {
  const result= await pool.query(`SELECT * FROM todos`)
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
})

app.get('/todos/:id',async(req:Request,res:Response)=>{
  try {
    const result=await pool.query(`SELECT * FROM todos WHERE id=$1`,[req.params.id])
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
})

app.put('/todos/:id',async(req:Request,res:Response)=>{
  const {title}=req.body;
  try {
    const result=await pool.query(`UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,[title,req.params.id])
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
})

app.delete('/todos/:id',async(req:Request,res:Response)=>{
  try {
    const result=await pool.query(`DELETE FROM todos WHERE id=$1`,[req.params.id])
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
})

app.use((req:Request,res:Response)=>{
  res.status(404).json({
    sucess:false,
    message:"Route not found",
    path:req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
