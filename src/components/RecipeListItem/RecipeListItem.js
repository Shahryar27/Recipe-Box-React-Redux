import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import {openDialog} from '../../store/middlewares';
import {connect} from 'react-redux';
import './RecipeListItem.css'

function mapDispatchToProps(dispatch){
  return {
    openDialog : (recipe) => dispatch(openDialog(recipe))
  }
}

class RecipeListItem extends Component{
    openDialog = () => {
        this.props.openDialog(this.props.recipe);
    }
    
    render(){
        const {recipe} = this.props;
        const style = {
            cursor: 'pointer',
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover',
            backgroundPosition: '45%',
            backgroundImage: 'url(' + (recipe.img || "../images/placeholder-image.png") + ')'
        };
        return (
            <GridTile
                className="title"
                title={<span>{recipe.title}</span>}
                onClick={this.openDialog}
                style={style}/>
        );
    }
}
export default connect(null, mapDispatchToProps)(RecipeListItem);