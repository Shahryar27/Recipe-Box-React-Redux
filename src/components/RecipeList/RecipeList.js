import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {RecipeListItem} from '../';
import {connect} from 'react-redux';
import {openDialog} from '../../store/middlewares';

import './RecipeList.css';


const styles = {
  gridList: {
    width: '100%'
  }
};
function mapStateToProps({recipies}){
  return {
    recipies
  }
}
function mapDispatchToProps(dispatch){
  return {
    openDialog : () => dispatch(openDialog(null))
  }
}
class RecipeList extends Component{
    render(){
        return (
            <div className='list-container'>
                <GridList
                 style={styles.gridList}>
                    {this.props.recipes.map((recipe) => (
                            <RecipeListItem key={recipe.title}  recipe={recipe}/>
                        ))}
                      <GridTile
                            key="add-recipe"
                            style={{cursor: 'pointer'}}
                            onClick={this.props.openDialog}
                            >
                            <img src="../images/add-btn.png" alt="add"/>
                      </GridTile>
                </GridList>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)