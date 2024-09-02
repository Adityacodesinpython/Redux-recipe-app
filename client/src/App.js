import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { recipes } from './redux/actions';
// import './App.css';
import RecipeList from './components/RecipeList';
import "./index.css";

const App = () => {
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState("");
  
  const dispatch = useDispatch();

  const getAllRecipes = () => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => dispatch(recipes(data)))
  };

  useEffect(() => {
    getAllRecipes();
  });

  const addRecipe = event => {
    event.preventDefault();

    fetch("/api/recipes/add-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title : newRecipeTitle, 
        ingredients : newRecipeIngredients
      })
    }).then(() => {
      setNewRecipeTitle("");
      setNewRecipeIngredients("");

      getAllRecipes();
    });
  };


  return (
    <div className='bg-sky-700 min-h-screen h-fit pb-5'>
      <h1 className='pt-5 text-center text-5xl font-bold text-cyan-400'>My Recipes</h1>

      <RecipeList updateRecipes={getAllRecipes}/>

      <form className='flex flex-col justify-center items-center gap-4' onSubmit={addRecipe}>
        <input 
          type='text'
          placeholder='add title'
          className='w-60 focus:outline-none focus:ring focus:ring-sky-400 border-solid rounded-lg border-2 border-sky-300 placeholder:text-sky-800 px-4 py-2 bg-sky-300'
          value={newRecipeTitle}
          onChange={event => setNewRecipeTitle(event.target.value)} 
        />
        <textarea 
          className='w-60 h-60 focus:outline-none focus:ring focus:ring-sky-400 border-solid rounded-lg border-2 border-sky-300 placeholder:text-sky-800 px-4 py-2 bg-sky-300'
          type='text'
          placeholder='add ingredients'
          value={newRecipeIngredients}
          onChange={event => setNewRecipeIngredients(event.target.value)} 
        />
        <input className='border-solid rounded-lg border-2 border-sky-300	text-cyan-400 px-4 py-2 text-center font-bold text-xl hover:bg-sky-800' type='submit' value="Add"/>
      </form>

    </div>
  )
}

// USE USESELECTOR INSTEAD OF CONNECT HERE 

// const mapStateToProps = state => ({
//   allRecipes: state.allRecipes
// });

// export default connect(
//   mapStateToProps
// )(App);
export default App;