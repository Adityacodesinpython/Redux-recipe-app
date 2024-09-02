import { combineReducers } from "redux";

const recipes = (state = [], action) => {
    if (action.type === "ALL_RECIPES") {
        return action.payload;
    }
    return state;
};

export default combineReducers({
    allRecipes: recipes
});