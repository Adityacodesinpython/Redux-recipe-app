import React from 'react';
import { useSelector } from 'react-redux';

const RecipeList = ({ updateRecipes }) => {
    const allRecipes = useSelector((state) => state.allRecipes)

    const deleteRecipe = (event, recipe) => {
        event.preventDefault();

        fetch(`/api/recipes/delete/${recipe._id}`, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(() => updateRecipes());
    }

    const toggleTried = recipe => {
        fetch(`/api/recipes/update/${recipe._id}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tried: !recipe.tried })
        }).then(() => updateRecipes());
    }
    
    return (
        <div className='container mx-auto px-4 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {allRecipes.length === 0 ? (
                    <div className='col-span-full text-center py-20'>
                        <p className='text-white text-2xl font-semibold'>
                            📝 No recipes yet. Add your first recipe below!
                        </p>
                    </div>
                ) : (
                    allRecipes.map((recipe, i) => (
                        <div 
                            key={i} 
                            className='bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden'
                        >
                            {/* Recipe Header */}
                            <div className='bg-gradient-to-r from-orange-400 to-red-400 p-5 relative'>
                                <div className='absolute top-3 right-3'>
                                    <button
                                        onClick={event => deleteRecipe(event, recipe)}
                                        className='bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110'
                                        title="Delete Recipe"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 12 16"
                                            fill="white"
                                        >
                                            <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className='bg-white bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-2 inline-block mb-2'>
                                    <span className='text-white font-bold text-sm'>Recipe #{i + 1}</span>
                                </div>
                                <h2 className={`text-2xl font-bold text-white ${recipe.tried ? 'line-through opacity-60' : ''}`}>
                                    {recipe.title || 'Untitled Recipe'}
                                </h2>
                            </div>

                            {/* Recipe Body */}
                            <div className='p-6'>
                                <div className='mb-4'>
                                    <h3 className='text-lg font-bold text-gray-800 mb-2 flex items-center gap-2'>
                                        <span>🥘</span>
                                        Ingredients:
                                    </h3>
                                    <p className={`text-gray-700 whitespace-pre-line leading-relaxed ${recipe.tried ? 'line-through opacity-60' : ''}`}>
                                        {recipe.ingredients}
                                    </p>
                                </div>

                                {/* Status Badge */}
                                <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-200'>
                                    <div className='flex items-center gap-3'>
                                        <label className='flex items-center gap-2 cursor-pointer group'>
                                            <input
                                                type="checkbox"
                                                checked={recipe.tried}
                                                onChange={() => toggleTried(recipe)}
                                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer'
                                            />
                                            <span className='text-gray-700 font-semibold group-hover:text-green-600 transition-colors'>
                                                {recipe.tried ? '✅ Tried' : 'Mark as Tried'}
                                            </span>
                                        </label>
                                    </div>
                                    {recipe.tried && (
                                        <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold'>
                                            ✓ Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
};

export default RecipeList;
