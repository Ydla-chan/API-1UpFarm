'use strict';

const db = require('../../../connection/conn');
const response = require('../../../response/response');

// Membuat ToDo baru
exports.createToDo = (req, res) => {
  const { userPlantId, status, date, IsOverdue } = req.body;

  const query = `INSERT INTO todo_list (userPlantId, status, date, IsOverdue) VALUES (?, ?, ?, ?)`;
  db.query(query, [userPlantId, status, date, IsOverdue], (err, result) => {
    if (err) {
      console.error('Error creating ToDo:', err);
      response.serverError('Error creating ToDo', res);
    } else {
      response.success({ todoId: result.insertId, userPlantId, status, date, IsOverdue }, res);
    }
  });
};

// Mendapatkan semua ToDo
exports.getAllToDos = (req, res) => {
  const query = 'SELECT * FROM todo_list';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching ToDos:', err);
      response.serverError('Error fetching ToDos', res);
    } else {
      response.success(results, res);
    }
  });
};

// Mendapatkan ToDo berdasarkan userPlantId
exports.getToDosByUserPlantId = (req, res) => {
  const { userPlantId } = req.params;
  const query = 'SELECT * FROM todo_list WHERE userPlantId = ?';
  db.query(query, [userPlantId], (err, results) => {
    if (err) {
      console.error('Error fetching ToDos by userPlantId:', err);
      response.serverError('Error fetching ToDos by userPlantId', res);
    } else if (results.length === 0) {
      response.serverError('No ToDos found for this user plant', res);
    } else {
      response.success(results, res);
    }
  });
};

// Memperbarui ToDo
exports.updateToDo = (req, res) => {
  const { todoId } = req.params;
  const { status, date, IsOverdue } = req.body;

  const query = `UPDATE todo_list SET status = ?, date = ?, IsOverdue = ? WHERE todoId = ?`;
  db.query(query, [status, date, IsOverdue, todoId], (err, result) => {
    if (err) {
      console.error('Error updating ToDo:', err);
      response.serverError('Error updating ToDo', res);
    } else if (result.affectedRows === 0) {
      response.serverError('ToDo not found', res);
    } else {
      response.success({ todoId, status, date, IsOverdue }, res);
    }
  });
};

// Menghapus ToDo
exports.deleteToDo = (req, res) => {
  const { todoId } = req.params;

  const query = 'DELETE FROM todo_list WHERE todoId = ?';
  db.query(query, [todoId], (err, result) => {
    if (err) {
      console.error('Error deleting ToDo:', err);
      response.serverError('Error deleting ToDo', res);
    } else if (result.affectedRows === 0) {
      response.serverError('ToDo not found', res);
    } else {
      response.success(`ToDo with ID ${todoId} deleted successfully`, res);
    }
  });
};
