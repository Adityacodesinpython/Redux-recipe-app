const express = require('express');

const recipeModel = require("../models/recipe");

const router = express.Router();

router.get("/", (req, res) => {
    recipeModel.find({})
        .then(recipes => res.json(recipes))
        .catch(err => res.status(500).json({error: err }));
})

router.post("/add-recipe", (req,res) => {
    const {title, ingredients} = req.body;
    
    const newRecipe = new recipeModel({
        title: title, 
        ingredients: ingredients
    })

    newRecipe.save()
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({error: err}));
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    recipeModel.findByIdAndDelete(id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({error: err}));
});

router.post("/update/:id", (req, res) => {
    const { tried } = req.body;
    recipeModel.findByIdAndUpdate(req.params.id, { tried })
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({error: err}));
});

module.exports = router;