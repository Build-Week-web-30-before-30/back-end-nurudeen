const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findByTodo
};

function find() {
  return db('links').select('id', 'link', 'todo_id');
}

function findByTodo(id) {
  return db('links').where({ todo_id: id })
}

function findById(id) {
  return db('links').where({ id: id })
}


async function add(tid, newLink) {
  const adding = {
    link: newLink.link,
    todo_id: tid
  }
  const [id] = await db('links').insert(adding);

  return findById(id);
}