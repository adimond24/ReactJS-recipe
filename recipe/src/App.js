import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import './App.css';

const App = () =>{

  const APP_ID = '81714f9d';
  const APP_KEY = 'face0363f756fe03268331d9e05867e3';
  
  const [recipes, setRecipes] = useState([]);
  const[search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')


  useEffect( ()=>{
    getRecipes();
  });

// const getRecipes = async()=>{
//   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//   const data = await response.json();
//   setRecipes(data.hits);
//   console.log(data.hits);
// }

const getRecipes = async () => {
  fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free

  `)
    .then((x) => x.json())
    .then((y) => setRecipes(y.hits) + console.log(y.hits));
};

const updateSearch = e =>{
  setSearch(e.target.value);
}

const getSearch = e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">
          Search
        </button>
        
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}
export default App;
