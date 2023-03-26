import { Pool } from "pg";

let pool;

if (!pool) {
    pool = new Pool({
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_IP,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
    });
}

export default pool ;