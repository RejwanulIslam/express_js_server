
import { pool } from "../../config/db"

const postTodoDB = async (user_id: string | number, title: string) => {
    const result = await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`, [user_id, title])
    return result
}
const getTodosDB = async () => {
    const result = await pool.query(`SELECT * FROM todos`)
    return result
}

const getSingleTodoDB = async (req: any) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [req.params.id])
    return result
}
const updateTodoDB = async (title: string, req: any) => {
    const result = await pool.query(`UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`, [title, req.params.id])
    return result
}

const deleteTodoDB = async (req:any) => {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [req.params.id])
    return result
}
export const todosService = {
    postTodoDB,
    getTodosDB,
    getSingleTodoDB,
    updateTodoDB,
    deleteTodoDB,
}
