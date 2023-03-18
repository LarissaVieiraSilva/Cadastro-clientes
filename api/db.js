import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Maria2018",
    database: "cadastro_clientes"
})