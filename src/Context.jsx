import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
//Using a Context API for passing props to children components and avoid props drill-down. The provider will be used in the index.js rendering the app.jsx and passing props to children components
const AppContext = React.createContext();

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealsURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      //destructure the response so that we can use the array
      const { data } = await axios.get(url);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }

      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };
  //using useEffect to fetch data from the URL a hook that runs after every render by default.Calling the function inside the hook we avoid infinite loops of requests

  useEffect(() => {
    fetchMeals(allMealsURL + `${searchTerm}`);
  }, [searchTerm]);
  const fetchRandomMeal = () => {
    fetchMeals(randomMealsURL);
  };

  return (
    <AppContext.Provider
      value={{ meals, loading, setSearchTerm, fetchRandomMeal }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
