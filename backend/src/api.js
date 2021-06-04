/* eslint-disable no-console */
const app = require('./app');
const { getTodos, postTodo, updateTodo, deleteTodo } = require('./handlers');

app.get('/api/todos', (req, res) => getTodos(req, res));

app.post('/api/todos', (req, res) => postTodo(req, res));

app.put('/api/todos/:id', (req, res) => updateTodo(req, res));

app.delete('/api/todos/:id', (req, res) => deleteTodo(req, res));

module.exports = app
