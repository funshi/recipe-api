import './App.css';
//import './Key'; 
import Axios from 'axios';
import { useState } from 'react';
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("")
  const [recipe, setrecipe] = useState([])
  const [healthLabels, sethealthLabels] = useState("vegan")


  const YOUR_APP_ID = "e3f03e19";
const YOUR_APP_KEY = "5b3d435a0e4ddd2d43801b7ca0cebee7";

  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${healthLabels}`;
 
  async function getRecipes () {
    var result = await Axios.get(url);
    setrecipe(result.data.hits)
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className= 'app'>
  <h1> Food Recipe Plaza </h1>
  <form className="app_search" onSubmit={onSubmit} >
    <input className="app_input" type="text"  placeholder="Enter Ingridient" value={query} onChange={(e) => setquery(e.target.value)} />
    <input className="app_submit" type="submit" value="search" />
  <select className="app_select">
   <option onClick={() => sethealthLabels("vegan")}>Vegan</option>
   <option value="vegan" onClick={() => sethealthLabels("alcohol free")}>alcohol free</option>
  <option value="vegeterian"
   onClick={() => sethealthLabels("vegetarian")}>Vegetarian</option>
   <option value="paleo" onClick={() => sethealthLabels("paleo")}>paleo</option>
   <option onClick={() => sethealthLabels("gluton free")}>Gluton Free</option>
   </select>
  </form>
  <div className="app_recipe">
    {recipe.map(recipe => {
      return <RecipeTile recipe={recipe} />
    })}
  </div>
  </div>
  );  
}

export default App;
