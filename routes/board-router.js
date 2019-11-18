const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const boardsHelpers = require('../models/boards-model')

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
      board_id: board
    });
  } catch(err) {
    res.status(500).json({ message: 'failed to insert new board'})
  }
})

module.exports = router;