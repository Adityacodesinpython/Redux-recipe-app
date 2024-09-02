const mongoose = require('../db');

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    tried: { type: Boolean, default: false }
});

const recipeModel = new mongoose.model('Recipe', recipeSchema);

module.exports = recipeModel;

