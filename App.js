import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (newTask.trim()) {
      const res = await axios.post('http://localhost:5000/todos', { task: newTask });
      setTodos([...todos, res.data]);
      setNewTask('');
    }
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="App">
      <div className='container'>
      <h1 className='Heading'>Todo List</h1>
      <div className='inputtaker'>
      <input className='taskadder'
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button className='button' onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleComplete(todo.id, todo.completed)}>
              {todo.task}
            </span>
            <button  className='deletebutton' onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
