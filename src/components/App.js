import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.recipesList = recipes.results;

    this.state = {
      searchString: '',
      recipes: this.recipesList,
    };

    this.filterRecipes = this.filterRecipes.bind(this);
  }

  filterRecipes(string){
    let filtedRecipes = this.recipesList;

    if(string !== ''){
      filtedRecipes = this.recipesList
        .filter(recipe => recipe.title.toLowerCase().includes(string)
          || recipe.ingredients.toLowerCase().includes(string));
    }

    this.setState({ recipes: filtedRecipes, searchString: string });
  }

  highlight(stringToHighlight, term){
    if(term !== ''){
        let tempResult = stringToHighlight.replace(new RegExp(`${term}`, 'ig'), match =>
                    `*<mark>${match}</mark>*`).split('*');

        return tempResult.map((val, ind) => {
            return (val.includes('mark'))
            ? <mark key={ ind }>{val.replace(/(<mark>)|(<\/mark>)/g, '') }</mark>
            : val;
        });
    }
 
    return stringToHighlight;
  }

  render() { 
    return (
      <div className="App">
        <Navbar searchString={ this.state.searchString } searchRecipeFn={ this.filterRecipes } />
        <div className="container mt-10">
          <div className="row">
            {(this.state.recipes.length > 0)
            ? this.state.recipes.map((recipe, ind) => {
              return < RecipeItem
                key={ ind }
                title={ this.highlight(recipe.title, this.state.searchString) }
                ingredients={ this.highlight(recipe.ingredients, this.state.searchString) }
                thumbnail={ recipe.thumbnail } />
             })
            : <h2 className="pt-5">No Results to show</h2>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
