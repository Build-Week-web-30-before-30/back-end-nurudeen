const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const boardsHelpers = require('../models/boards-model')
const todoHelper = require('../models/todos-model')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const boards= await boardsHelpers.findPublic();

    res.status(200).json(boards);
  } catch(err) {
    res.status(500).json({ message: 'failed to get public boards'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const boards= await boardsHelpers.findById(req.params.id);
    const todos = await todoHelper.getByBoard(req.params.id);
    const resBoards = {
      id: boards.id,
      name: boards.name,
      public: boards.public,
      user_id: boards.user_id,
      completed: boards.completed,
      deadline: boards.deadline,
      todos: todos
    }

    res.status(200).json(resBoards);
  } catch(err) {
    res.status(500).json({ message: 'failed to get board'})
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const sendBoard = {
      name: req.body.name,
      public: req.body.public === true ? "true" : "false",
      user_id: req.body.user_id
    }
    const board= await boardsHelpers.add(sendBoard);

    res.status(201).json({
      message: 'board created successfully',
      board: board
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to insert new board'})
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const condition = { public: req.body.public === true ? "true" : "false" };
    const board= await boardsHelpers.modify(req.params.id, condition);

    res.status(201).json({
      message: 'board updated successfully',
      board: board
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to updapte board'})
  }
})

router.post('/:id/feedback', verifyToken, async (req, res) => {
  try {
    const newFeedback = {
      board_id: req.params.id,
      text: req.body.text
    }
    const feedback = await boardsHelpers.addFeedback(newFeedback);

    res.status(201).json({
      message: 'feedback added successfully',
      feddback: feedback
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to add new feedback'})
  }
})

router.get('/:id/feedback', verifyToken, async (req, res) => {
  try {
    const feedback = await boardsHelpers.getBoardFeedback(req.params.id);

    res.status(200).json(
     feedback
    );
  } catch(err) {
    res.status(500).json({ message: `failed to fetch feedback for board ${req.params.id}`})
  }
})

router.get('/:id/todo', async (req, res) => {
  try {
    
    const todos= await todoHelper.getByBoard(req.params.id);

    res.status(200).json(todos);
  } catch(err) {
    res.status(500).json({ message: 'failed to get todos for this board'})
  }
})

router.post('/:id/todo', verifyToken, async (req, res) => {
  try {
    const newTodo = {
      name: req.body.name,
      completed: req.body.completed === true ? "true" : "false",
      deadline: req.body.deadline,
      board_id: req.params.board_id
    }
    const todo = await todoHelper.add(newTodo);

    res.status(201).json({
      message: 'todo added successfully',
      todo: todo
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to insert new todo'})
  }
})



module.exports = router;