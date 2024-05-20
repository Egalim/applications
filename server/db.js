import postgres from "postgres";

export const sql = postgres({
    host: "localhost",
    port: "5432",
    username: "postgres",
    database: "DEMKA",
    password: "root"
})