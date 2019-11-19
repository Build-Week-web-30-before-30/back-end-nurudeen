const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const todoHelper = require('../models/todos-model')

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

module.exports = router;