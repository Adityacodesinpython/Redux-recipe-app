import React from 'react';

const RecipeList = ({ recipes, updateRecipes }) => {

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
        <div className='m-8 flex flex-col items-center'>            
            {recipes.map((recipe, i) => (
            <div key={i} className='flex flex-col justify-center w-1/2 p-5'>
                <h2 className='text-3xl text-sky-950 font-bold mb-3'>Recipe {i+1}</h2>
                <ol>
                    <li className={`${recipe.tried ? 'line-through' : ''}`}>
                        <span className='text-sky-950 font-bold'>Title:</span>
                         {recipe.title}
                    </li>
                    <li className={`${recipe.tried ? 'line-through' : ''}`}>
                        <span className='text-sky-950 font-bold'>Ingredients:</span>
                    </li>
                    
                    <li className={`${recipe.tried ? 'line-through' : ''}`}>
                        {recipe.ingredients}
                    </li>
                    <div className='flex items-center gap-10 m-3'>
                        <div className='flex items-center gap-2'>
                            <label className='text-sky-950 font-bold'>Tried:</label>
                            <input
                                type="checkbox"
                                checked={recipe.tried}
                                onChange={() => toggleTried(recipe)}
                                className='w-4 h-4 bg-sky-400 border-sky-300 rounded focus:ring-blue-500 focus:ring-2'
                            />{' '}
                        </div>
                        <svg
                            onClick={event => deleteRecipe(event, recipe)}
                            width="16"
                            height="16"
                            viewBox="0 0 12 16"
                            className='w-4 h-4 bg-red-400 border-sky-300 rounded focus:ring-blue-500 focus:ring-2'
                            >
                            <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
                        </svg>      
                    </div>          
                </ol>
            </div>

            ))}

        </div>
)};

export default RecipeList;
