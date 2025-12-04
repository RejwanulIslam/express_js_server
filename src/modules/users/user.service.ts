import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

const creactUserDB = async (paylod: Record<string, unknown>) => {
    const { name, email, password,role } = paylod

    const hasspass=await bcrypt.hash(password as string,10)

    const result = await pool.query(`INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)
          RETURNING *`, [name, email,hasspass,role])
    return result
}

const getUserDB = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result;
}

const getSingleUserDB = async (req: any) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [req.params.id])
    return result
}
const updateUserDB = async (name: string, email: string, req: any) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, req.params.id])
    return result;
}
const deleteUserDB = async (req: any) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [req.params.id])
    return result;
}

export const userService = {
    creactUserDB,
    getUserDB,
    getSingleUserDB,
    updateUserDB,
    deleteUserDB
}