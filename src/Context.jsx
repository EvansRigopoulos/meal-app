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
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  //will use this function when we select the img of a meal and pass the id
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;

    meal = meals.find((meal) => meal.idMeal === idMeal);
    setSelectedMeal(meal);
    setShowModal(true);
  };

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
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };
  //using useEffect to fetch data from the URL a hook that runs after every render by default.Calling the function inside the hook we avoid infinite loops of requests
  useEffect(() => {
    fetchMeals(allMealsURL);
  }, []);
  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(allMealsURL + `${searchTerm}`);
  }, [searchTerm]);
  const fetchRandomMeal = () => {
    fetchMeals(randomMealsURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
