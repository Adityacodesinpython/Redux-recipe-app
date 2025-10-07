import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { recipes } from './redux/actions';
// import './App.css';
import RecipeList from './components/RecipeList';
import "./index.css";

const App = () => {
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();

  const getAllRecipes = () => {
    setLoading(true);
    setError(null);
    fetch('/api/recipes')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
      })
      .then(data => {
        dispatch(recipes(data));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllRecipes();
  }, []); // Fixed: Added empty dependency array to run only once on mount

  const addRecipe = event => {
    event.preventDefault();

    // Client-side validation
    if (!newRecipeTitle.trim() || !newRecipeIngredients.trim()) {
      setError('Please fill in both title and ingredients');
      return;
    }

    setLoading(true);
    setError(null);

    fetch("/api/recipes/add-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title : newRecipeTitle.trim(), 
        ingredients : newRecipeIngredients.trim()
      })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to add recipe');
      return res.json();
    })
    .then(() => {
      setNewRecipeTitle("");
      setNewRecipeIngredients("");
      getAllRecipes();
    })
    .catch(err => {
      console.error('Error adding recipe:', err);
      setError('Failed to add recipe. Please try again.');
      setLoading(false);
    });
  };


  return (
    <div className='bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 min-h-screen h-fit pb-10'>
      {/* Header Section */}
      <div className='bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex items-center justify-center gap-4'>
            <span className='text-6xl'>🍳</span>
            <h1 className='text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight'>
              My Recipe Book
            </h1>
          </div>
          <p className='text-center text-white text-lg mt-3 font-medium'>
            Create, manage, and organize your favorite recipes
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='container mx-auto px-4 mt-6'>
          <div className='max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg flex items-center gap-3'>
            <span className='text-2xl'>⚠️</span>
            <div>
              <p className='font-bold'>Error</p>
              <p>{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className='ml-auto text-red-500 hover:text-red-700 font-bold text-xl'
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className='container mx-auto px-4 mt-6'>
          <div className='max-w-2xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center justify-center gap-3'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'></div>
            <span className='text-gray-700 font-semibold'>Loading...</span>
          </div>
        </div>
      )}

      {/* Recipe List Section */}
      <RecipeList updateRecipes={getAllRecipes}/>

      {/* Add Recipe Form Section */}
      <div className='container mx-auto px-4 mt-10'>
        <div className='max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
            <span className='text-4xl'>➕</span>
            Add New Recipe
          </h2>
          
          <form className='flex flex-col gap-5' onSubmit={addRecipe}>
            <div>
              <label className='block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide'>
                Recipe Title
              </label>
              <input 
                type='text'
                placeholder='e.g., Chocolate Chip Cookies'
                className='w-full focus:outline-none focus:ring-4 focus:ring-purple-300 border-2 border-gray-300 rounded-xl px-5 py-3 bg-gray-50 text-gray-800 placeholder:text-gray-400 transition-all duration-300 hover:border-purple-400'
                value={newRecipeTitle}
                onChange={event => setNewRecipeTitle(event.target.value)} 
                required
              />
            </div>
            
            <div>
              <label className='block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide'>
                Ingredients
              </label>
              <textarea 
                className='w-full h-40 focus:outline-none focus:ring-4 focus:ring-purple-300 border-2 border-gray-300 rounded-xl px-5 py-3 bg-gray-50 text-gray-800 placeholder:text-gray-400 resize-none transition-all duration-300 hover:border-purple-400'
                type='text'
                placeholder='List your ingredients here...'
                value={newRecipeIngredients}
                onChange={event => setNewRecipeIngredients(event.target.value)} 
                required
              />
            </div>
            
            <button 
              className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none' 
              type='submit'
              disabled={loading}
            >
              {loading ? '⏳ Adding...' : '🎉 Add Recipe'}
            </button>
          </form>
        </div>
      </div>

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