const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const todoHelper = require('../models/todos-model')
const linkHelper = require('../models/links-model')

const router = express.Router();

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const todo = await todoHelper.modify(req.params.id, req.body);

    res.status(200).json({
      message: 'todo updated successfully',
      todo: todo
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to update todo', error: err.message})
  }
})

router.post('/:id/link', verifyToken, async (req, res) => {
  try {
    const link = await linkHelper.add(req.params.id, req.body);

    res.status(201).json({
      message: 'link added successfully',
      link: link
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to add link', error: err.message})
  }
})

router.get('/:id/link', verifyToken, async (req, res) => {
  try {
    const link = await linkHelper.findByTodo(req.params.id);

    res.status(200).json(link);
  } catch(err) {
    res.status(500).json({ message: 'failed to fetch links', error: err.message})
  }
})

module.exports = router;