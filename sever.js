const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
/****************connecting to  mysql************************* */
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CHIDERA001?.1",
    database: "todo_app",
    port: "3306",
  });
// Endpoint for creating a new task
app.post("/createTask", function (req, res) {
  const { title } = req.body;
  const sql = `INSERT INTO tasks (title) VALUES (?)`;
  con.query(sql, [title], function (err, result) {
     if (err) throw err;
     res.send(result);
  });
 });
 // Endpoint for task editting (updating)
 app.listen(3000), console.log("server is running at port 3000")