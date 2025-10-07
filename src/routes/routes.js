const express = require('express');

const recipeModel = require("../models/recipe");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const recipes = await recipeModel.find({});
        res.json(recipes);
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ error: 'Failed to fetch recipes', message: err.message });
    }
});

router.post("/add-recipe", async (req, res) => {
    try {
        const { title, ingredients } = req.body;
        
        // Validation
        if (!title || !ingredients) {
            return res.status(400).json({ error: 'Title and ingredients are required' });
        }

        if (title.trim().length === 0 || ingredients.trim().length === 0) {
            return res.status(400).json({ error: 'Title and ingredients cannot be empty' });
        }
        
        const newRecipe = new recipeModel({
            title: title.trim(), 
            ingredients: ingredients.trim()
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        console.error('Error adding recipe:', err);
        res.status(500).json({ error: 'Failed to add recipe', message: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // Validate MongoDB ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid recipe ID format' });
        }

        const deletedRecipe = await recipeModel.findByIdAndDelete(id);
        
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ error: 'Failed to delete recipe', message: err.message });
    }
});

router.post("/update/:id", async (req, res) => {
    try {
        const { tried } = req.body;
        const id = req.params.id;

        // Validate MongoDB ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid recipe ID format' });
        }

        if (typeof tried !== 'boolean') {
            return res.status(400).json({ error: 'Tried must be a boolean value' });
        }

        const updatedRecipe = await recipeModel.findByIdAndUpdate(
            id, 
            { tried },
            { new: true } // Return the updated document
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(updatedRecipe);
    } catch (err) {
        console.error('Error updating recipe:', err);
        res.status(500).json({ error: 'Failed to update recipe', message: err.message });
    }
});

module.exports = router;