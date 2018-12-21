import {combineReducers} from 'redux';
import {currentRecipeReducer, recipesReducer, dialogOpenReducer} from './recipe_reducer';

const rootReducer = combineReducers({
    recipes: recipesReducer,
    currentRecipe: currentRecipeReducer,
    dialogOpen: dialogOpenReducer
});

export default rootReducer;