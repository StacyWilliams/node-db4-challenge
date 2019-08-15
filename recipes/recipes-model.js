const db = require('./recipes-router')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
  };
  
  function find() {
    return db('recipes');
  }
  function findById(id) {
    return db('recipes')
    .where({ id });
  }
  
  function add(recipe) {
    return db('recipes')
    .insert(recipe)
    .then(res => find())
  }
  
  function findSteps(id) {
    return db('steps')
      .innerJoin('recipes', 'steps.recipe_id', '=', 'recipes.id')
      .select('recipes.recipe_name', 'steps.step_number')
      .where({recipe_id: id });
  }
  
  function update(id, changes) {
    return db('recipes')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('recipes')
      .where({ id })
      .del();
  }
  