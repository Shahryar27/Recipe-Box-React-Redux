import Actions from '../actions';
import {guidGenerator} from '../../helper';

export function openDialog(recipe) {
    return dispatch => {
        dispatch(Actions.isDialogOpen(true));
        dispatch(Actions.setCurrentRecipe(recipe))
    }
}

export function closeDialog() {
    return dispatch => {
        dispatch(Actions.isDialogOpen(false));
        dispatch(Actions.setCurrentRecipe(null))
    }
}
export function createRecipe(recipe, isNew) {
    return dispatch => {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        if(isNew){
            let newId = guidGenerator();
            recipes.push({...recipe, id: newId});
        }
        else{
            for(let i = 0; i < recipes.length; i++){
                let r = recipes[i];
                if(r.id === recipe.id){
                    recipes[i] = recipe;
                    break;
                }
            }
        }
        localStorage.setItem('recipes', JSON.stringify(recipes));
        dispatch(closeDialog());
        dispatch(getAllRecipes());
    }
}
export function deleteRecipe(recipe){
    return dispatch => {
        let recipes = JSON.parse(localStorage.getItem('recipes'));
        if(recipes === null){
            return;
        }

        for(var i = 0; i < recipes.length; i++){
            if(recipes[i].id === recipe.id){
                recipes.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('recipes', JSON.stringify(recipes));
        dispatch(closeDialog());
        dispatch(getAllRecipes());
    }
}
export function getAllRecipes() {
    return dispatch => {
        const dummy_recipes = [
            {
                id: 'ds832ws',
                img: 'https://www.friendlys.com/wp-content/themes/netplus/img/production/detail/menu/b' +
                        'reakfast_breakfast-classics_big-two-do-breakfast.jpg',
                title: 'Breakfast',
                items: ['eggs', 'bread']
            }, {
                id: 'mklo2a',
                img: 'http://smokeybones.com/wp-content/uploads/2015/11/loaded-bbq-burger.jpg',
                title: 'Tasty burger',
                items: ['salad', 'fried meat']
            }, {
                id: 'mkxmq92',
                img: 'http://i.ndtvimg.com/i/2015-11/french-fries-625_625x350_61446325913.jpg',
                title: 'Fries',
                items: ['potatoes', 'oil']
            }, {
                id: 'mkbwyds3',
                img: 'https://static01.nyt.com/images/2015/07/27/dining/27SPAGHETTI/27SPAGHETTI-superJ' +
                        'umbo.jpg',
                title: 'Spaghetti',
                items: ['noodles']
            }
        ];

        let recipes = JSON.parse(localStorage.getItem('recipes'));
        
        if(recipes === null) {
            localStorage.setItem('recipes', JSON.stringify(dummy_recipes));
            dispatch(Actions.setRecipes(dummy_recipes));
        }
        else{
            dispatch(Actions.setRecipes(recipes));
        }
    }

}
