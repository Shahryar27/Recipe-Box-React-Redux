import React, { Component } from 'react';
import {RecipeList, CustomDialog} from '../';
import {getAllRecipes} from '../../store/middlewares';
import {connect} from 'react-redux';
import './App.css';

function mapStateToProps({recipes}){
  return { recipes }
}

function mapDispatchToProps(dispatch){
  return {
    getAllRecipes: () => dispatch(getAllRecipes())
  }
}

class App extends Component {
  
  componentDidMount(){
    this.props.getAllRecipes();
  }
  render() {
    
    return (
      <div className="App">
        <h1>Recipe Box</h1>
        
        <RecipeList recipes={this.props.recipes}/>
        
        <CustomDialog />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
