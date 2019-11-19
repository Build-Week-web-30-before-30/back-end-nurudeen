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

router.post('/', verifyToken, async (req, res) => {
  try {
    const board= await boardsHelpers.add(req.body);

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
    const board= await boardsHelpers.modify(req.params.id, req.body);

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
    const newTodo = ({
      name: req.body.name,
      completed: req.body.completed,
      deadline: req.body.deadline,
      board_id: req.params.id
    })
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