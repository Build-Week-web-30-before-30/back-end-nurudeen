const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const boardsRouter = require('../routes/board-router');
const todosRouter = require('../routes/todo-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/board', boardsRouter);
server.use('/api/todo', todosRouter);

server.get('/', (req, res) => {
  res.status(200).json({message: "Welcome to the 30 Before 30 Backend"});
});

module.exports = server;
