const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findPublic,
  findById,
  findFeedbackById,
  addFeedback
};

function find() {
  return db('board').select('id', 'name', 'public', 'user_id');
}

function findPublic() {
  return db('board').where({ public: 'true' });
}

async function add(newBoard) {
  const [id] = await db('board').insert(newBoard);

  return findById(id);
}

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