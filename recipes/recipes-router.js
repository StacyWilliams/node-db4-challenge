const express = require('express');
const recipes = require('./recipes-model');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recipes = await recipes.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get recipes' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await recipes.findById(id);

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get recipes' });
  }
});

router.get('/:id/steps', async (req, res) => {
  const { id } = req.params;

  try {
    const steps = await recipes.findSteps(id);

    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given recipe' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get steps' });
  }
});

router.post('/', async (req, res) => {
  const recipeData = req.body;

  try {
    const recipe = await recipes.add(recipeData);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new recipe' });
  }
});

router.post('/:id/steps', async (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  try {
    const recipe = await recipes.findById(id);

    if (recipe) {
      const step = await recipes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new step' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const recipe = await recipes.findById(id);

    if (recipe) {
      const updatedRecipe = await recipes.update(changes, id);
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update recipe' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await recipes.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
});

module.exports = router;