export default class Actions{
    static OPEN_DIALOG = "OPEN_DIALOG";
    static CURRENT_RECIPE = "CURRENT_RECIPE";
    static ALL_RECIPES = "ALL_RECIPES";

    static isDialogOpen(dialogOpen){
        return {
            type: Actions.OPEN_DIALOG,
            dialogOpen
        }
    }

    static setCurrentRecipe(recipe){
        return {
            type: Actions.CURRENT_RECIPE,
            recipe
        }
    }
    
    static setRecipes(recipes) {
        return {
            type: Actions.ALL_RECIPES,
            recipes
        }
    }
} 