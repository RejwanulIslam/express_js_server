import { Pool } from "pg"
import config from "."

export const pool = new Pool({
  connectionString: `${config.CONNECTION_STR}`
})
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(100)UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
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

export default initDB;