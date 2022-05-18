const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
    Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const recipe_name = req.body.recipe_name;
    const ingredients = req.body.ingredients;
    const directions = req.body.directions;
    
    const newRecipe = new Recipe({
        username,
        recipe_name,
        ingredients,
        directions
    });

    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('Recipe deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.username = req.body.username;
            recipe.recipe_name = req.body.recipe_name;
            recipe.ingredients = req.body.ingredients;
            recipe.directions = req.body.directions;

            recipe.save()
                .then(() => res.json('Recipe updated!'))
                .catch(err => {res.status(400).json('Error: ' + err)});
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;