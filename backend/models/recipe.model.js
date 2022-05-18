const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    username: { type: String, required: true },
    recipe_name: { type: String, required: true },
    ingredients: { type: String, required: true },
    directions: { type: String, required: true }
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;