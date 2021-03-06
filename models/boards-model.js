const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findPublic,
  findById,
  findFeedbackById,
  addFeedback,
  getBoardFeedback,
  modify
};

function find() {
  return db('board').select('id', 'name', 'public', 'user_id');
}

function findPublic() {
  return db('board').where({ public: 'true' })
  // .select(['*', 'board.id as id', 'todo.id as todo_id'])
  // .from('board')
  // .join('todo', 'todo.board_id' , 'board.id');
}

async function add(newBoard) {
  const [id] = await db('board').insert(newBoard);

  return findById(id);
}
/*
SELECT board.id, board.name, todo.id, todo.name
FROM board
INNER JOIN todo
 ON(todo.board_id = board.id)
*/
function findById(id) {
  return db('board')
    .where({ id })
    .first();
}

async function addFeedback(newFeedback) {
  const [id] = await db('feedback').insert(newFeedback);

  return findFeedbackById(id);
}

function findFeedbackById(id) {
  return db('feedback')
    .where({ id })
    .first();
}

async function getBoardFeedback(board_id) {
  const feedbacks = await db('feedback').where({ board_id: board_id });

  return feedbacks;
}

async function modify(board_id, changes) {
  await db('board')
    .update(changes)
    .where({ id: board_id })
  
  return findById(board_id);
}