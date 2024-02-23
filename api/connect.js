import mysql from "mysql";


//if there is a auth problem (MYSQL):
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"social"
})