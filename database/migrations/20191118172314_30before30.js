
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username', 128).unique().notNullable();
    table.string('password', 128).notNullable();
    table.string('name, 128').notNullable()
  }).createTable('board', table => {
    table.increments();
    table.string('name', 128).notNullable();
    table.string('public').defaultTo('false');
    table.integer('user_id')
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users');
  }).createTable('todo', table => {
    table.increments();
    table.string('name', 128).notNullable();
    table.string('completed').defaultTo('false');
    table.integer('deadline');
    table.integer('board_id')
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('board');
  }).createTable('links', table => {
    table.increments();
    table.string('link', 128).notNullable();
    table.integer('todo_id')
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('todo');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('links')
                    .dropTableIfExists('todo')
                    .dropTableIfExists('board')
                    .dropTableIfExists('users')
};
