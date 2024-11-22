'use strict';

const db = require('../../../connection/conn');
const response = require('../../../response/response');

// Create a new todo_task
exports.createTodoTask = (req, res) => {
  const { todoId, name, IsComplete, gold, task } = req.body;

  if (!todoId || !name || !IsComplete || !gold || !task) {
    return response.serverError('All fields are required', res);
  }

  const query = `INSERT INTO todo_task (todoId, name, IsComplete, gold, task) 
                 VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [todoId, name, IsComplete, gold, task], (err, result) => {
    if (err) {
      console.error('Error creating todo_task:', err);
      response.serverError('Error creating todo_task', res);
    } else {
      response.success({
        message: 'Todo task created successfully',
        data: { todoTaskId: result.insertId, todoId, name, IsComplete, gold, task },
      }, res);
    }
  });
};

// Get all todo_tasks
exports.getAllTodoTasks = (req, res) => {
  const query = 'SELECT * FROM todo_task';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching todo_tasks:', err);
      response.serverError('Error fetching todo_tasks', res);
    } else {
      response.success({
        message: 'Todo tasks retrieved successfully',
        data: results,
      }, res);
    }
  });
};

// Get todo_tasks by todoId
exports.getTodoTasksByTodoId = (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    return response.serverError('Todo ID is required', res);
  }

  const query = 'SELECT * FROM todo_task WHERE todoId = ?';
  db.query(query, [todoId], (err, results) => {
    if (err) {
      console.error('Error fetching todo tasks by todoId:', err);
      response.serverError('Error fetching todo tasks by todoId', res);
    } else if (results.length === 0) {
      response.serverError('No tasks found for this todo', res);
    } else {
      response.success({
        message: `Tasks for todoId ${todoId} retrieved successfully`,
        data: results,
      }, res);
    }
  });
};

// Update a todo_task
exports.updateTodoTask = (req, res) => {
  const { todoTaskId } = req.params;
  const { name, IsComplete, gold, task } = req.body;

  if (!todoTaskId) {
    return response.serverError('Todo Task ID is required', res);
  }

  const query = `UPDATE todo_task 
                 SET name = ?, IsComplete = ?, gold = ?, task = ? 
                 WHERE todoTaskId = ?`;
  db.query(query, [name, IsComplete, gold, task, todoTaskId], (err, result) => {
    if (err) {
      console.error('Error updating todo_task:', err);
      response.serverError('Error updating todo_task', res);
    } else if (result.affectedRows === 0) {
      response.serverError('Todo task not found', res);
    } else {
      response.success({
        message: `Todo task with ID ${todoTaskId} updated successfully`,
        data: { todoTaskId, name, IsComplete, gold, task },
      }, res);
    }
  });
};

// Delete a todo_task
exports.deleteTodoTask = (req, res) => {
  const { todoTaskId } = req.params;

  if (!todoTaskId) {
    return response.serverError('Todo Task ID is required', res);
  }

  const query = 'DELETE FROM todo_task WHERE todoTaskId = ?';
  db.query(query, [todoTaskId], (err, result) => {
    if (err) {
      console.error('Error deleting todo_task:', err);
      response.serverError('Error deleting todo_task', res);
    } else if (result.affectedRows === 0) {
      response.serverError('Todo task not found', res);
    } else {
      response.success({
        message: `Todo task with ID ${todoTaskId} deleted successfully`,
      }, res);
    }
  });
};
