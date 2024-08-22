const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tiger',
  database: 'todo_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Get all tasks
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new task
app.post('/todos', (req, res) => {
  const task = req.body.task;
  db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, task, completed: false });
  });
});

// Update a task
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;
  db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Delete a task
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
