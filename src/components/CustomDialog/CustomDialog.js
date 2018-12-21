import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import {connect} from 'react-redux';
import {closeDialog, createRecipe, deleteRecipe} from '../../store/middlewares';
import './CustomDialog.css';

function mapStateToProps({dialogOpen, currentRecipe}){
  return {
    dialogOpen, currentRecipe
  }
}

function mapDispatchToProps(dispatch){
  return {
    closeDialog : () => dispatch(closeDialog()),
    createRecipe: (recipe, isNew) => dispatch(createRecipe(recipe, isNew)),
    deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe))
  }
}

class CustomDialog extends Component{
    constructor(props){
        super(props);
        this.state = {loading: false, items: [], error: null};//items = ingredients
    }
    handleSave = () => {
        this.setState({loading: true});
        // we have to save only when the items have been updated
        let timeout = setTimeout(() => {
            const refs = this.refs;
            const title = refs.recipe_title.input.value;
            const img = refs.recipe_img.input.value;
            const {currentRecipe} = this.props;
            const {items} = this.state;
            let error;
            if(title === '' || title === null){
                error = 'Title is required';
            }
            else if(items.length === 0){
                error = 'At least one ingredient is required';
            }
            else{
                let recipe = currentRecipe ? {...currentRecipe, title, img, items} : {title, img, items} ; 
                this.props.createRecipe(recipe, currentRecipe === null);
            }
            this.setState({error, loading: false});
            clearTimeout(timeout);
        }, 1000);

    }
    
    deleteRecipe = () => {
        this.props.deleteRecipe(this.props.currentRecipe);
    }

    timeout = null
    handleKeyUp = (e) => {
        e.persist();
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        //we only want to save the items when the user has stopped typing. 
        this.timeout = setTimeout(() => {
            const rexp = /\s*,+\s*/g; 
            let trimmedStr = e.target.value.replace(rexp,',');//replace strings like "   ,  " with ","
            trimmedStr = trimmedStr.trim();//remove whitespaces from start and end
            const items = trimmedStr.split(',').filter(a => a !== '');//remove empty strings from array
            this.setState({items});
        }, 1000)
        
    }
    
    componentWillReceiveProps(nextProps){
        const {currentRecipe} = nextProps;
        this.setState({loading: false, error: null, items: currentRecipe ? currentRecipe.items : []});
    }
    render(){
        const {currentRecipe} = this.props;
        const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.props.closeDialog}
        />,
        <RaisedButton 
            label="Delete"
            secondary={true}
            onClick={this.deleteRecipe}
            style={{marginRight: 5, marginLeft: 5, display: currentRecipe ? "inline-block" : "none"}}
        />,
        <RaisedButton
            label={this.state.loading ? 'Saving...' : 'Save'}
            primary={true}
            disabled={this.state.loading}
            onTouchTap={this.handleSave}
        />
        ];
        
        return (
            <Dialog
                title={(currentRecipe ? "Edit" : "Create") + " Recipe"}
                actions={actions}
                modal={true}
                style={{textAlign: 'center'}}
                open={this.props.dialogOpen}
                autoScrollBodyContent={true}>

                <div style={{width: 256, margin: 'auto'}}>
                    <div style={{textAlign:'left', color: 'red'}}>{this.state.error}</div>
                    
                    <div>
                        <TextField 
                            type="text"
                            hintText="Add Recipe Title"
                            floatingLabelText="Recipe Title"
                            ref="recipe_title"
                            defaultValue={currentRecipe && currentRecipe.title}
                            />
                    </div>
                    
                    <div>
                        <TextField 
                            type="text"
                            hintText="Add Image URL"
                            floatingLabelText="Image URL"
                            ref="recipe_img"
                            defaultValue={currentRecipe && currentRecipe.img}
                            />
                    </div>
                    
                    <div className="ingr">{this.state.items.length > 0 ? 'Ingredients' : null}</div>
                    
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {this.state.items.map((item, i) => {
                            return (
                                <Chip
                                    key={i}
                                    style={{margin: 4}}>
                                    {item}
                                </Chip>
                            );
                        })}
                        
                    </div>
                    
                    <div>
                        <TextField 
                            type="text"
                            hintText="Yogurt, Cheese, Water"
                            floatingLabelText="Ingredients"
                            ref="recipe_ingredient"
                            style={{textAlign: 'left'}}
                            multiLine={true}
                            defaultValue={currentRecipe && currentRecipe.items.join(', ')}
                            onKeyUp={this.handleKeyUp}
                            />
                    </div>
                </div>
            </Dialog>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);