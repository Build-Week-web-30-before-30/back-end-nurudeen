const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.status(200).json({message: "Welcome to the 30 Before 30 Backend"});
});

module.exports = server;
