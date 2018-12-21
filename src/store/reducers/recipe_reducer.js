import RecipeAction from '../actions';

export function currentRecipeReducer(state = null, action){
    switch(action.type){
        case RecipeAction.CURRENT_RECIPE:
            return action.recipe;
        default:
            return state;
    }
}

export function recipesReducer(state = [], action){
    switch(action.type){
        case RecipeAction.ALL_RECIPES:
            return action.recipes;
        default:
            return state;
    }
}

export function dialogOpenReducer(state = false, action){
    switch(action.type){
        case RecipeAction.OPEN_DIALOG:
            return  action.dialogOpen;
        default:
            return state;
    }
}