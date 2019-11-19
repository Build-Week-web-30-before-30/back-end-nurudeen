const db = require('../database/db-config.js');

module.exports = {
  add,
  modify,
  getByBoard,
  getAll,
  getTodoById
};

function getAll() {
  return db('todo');
}

function getByBoard(board_id) {
  return db('todo').where({board_id: board_id});
}

function getTodoById(id) {
  return db('todo').where({id: id});
}

async function add(todo) {
  const [id] = await db('todo').insert(todo);

  return getTodoById(id);
}

async function modify(todo_id, changes) {
  console.log(todo_id,changes)
  const updated = await db('todo')
    .update(changes)
    .where({ id: todo_id })
  
  return getTodoById(todo_id);
}
