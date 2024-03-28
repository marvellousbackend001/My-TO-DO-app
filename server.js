const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

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
app.post("/createTask", bodyParser.json(), function (req, res) {
  const { title } = req.body;
  const sql = `INSERT INTO tasks (title) VALUES (?)`;
  con.query(sql, [title], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
// Endpoint for editing an existing task
app.put("/updateTask/:id", bodyParser.json(), function (req, res) {
  const task_id = req.params.id;
  const { title, completed } = req.body;
  const sql = `UPDATE tasks SET title = ?, completed = ? WHERE id = ?`;
  con.query(sql, [title, completed, task_id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
// Endpoint for listing all tasks
app.get("/listTasks", function (req, res) { 
  const sql = `SELECT * FROM tasks`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
// Endpoint for deleting a task
app.delete("/deleteTask/:id", function (req, res) {
  const taskid = req.params.id;
  const sql = `DELETE FROM tasks WHERE id =?`;
  con.query(sql, [taskid], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
//Endpoint for completing task
app.put("/completeTask/:id", function (req, res) {
  const taskId = req.params.id;
  const sql = `UPDATE tasks SET completed = 1 WHERE id = ?`;
  con.query(sql, [taskId], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.listen(8080),
  console.log("server is running at port 8080") 