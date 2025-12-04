import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (email: string, password: string,role:string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    if (result.rows.length === 0) {
        return null;
    }

    const user = result.rows[0]
    console.log(user)
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return false;
    }
    const secret = config.JWT_SECRET as string
    const token = jwt.sign({ name: user.name, email: user.email, role:user.role }, secret, {
        expiresIn: '10d',
    })
    
    console.log({ token })

    return { token, user }
}

export const authservices={
    loginUser,
}