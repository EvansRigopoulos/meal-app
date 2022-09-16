import React from 'react';
import { BsHandThumbsUp } from 'react-icons/bs';

import { useGlobalContext } from '../Context';
const Meals = () => {
  //destructuring of custom hook
  const { loading, meals } = useGlobalContext();
  if (loading) {
    return (
      <section className='section'>
        <h4>Loading...</h4>
      </section>
    );
  }
  if (meals.length < 1) {
    return (
      <section className='section'>
        <h4>No meals matched your search term.PLease try again.</h4>
      </section>
    );
  }
  return (
    //using map function to iterate the array from the API
    <section className='section-center'>
      {meals.map((singleMeal) => {
        //giving aliases for title and image to use for ease when  destructuring
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

        return (
          <article key={idMeal} className='single-meal'>
            <img
              src={image}
              className='img'
              style={{ width: '360px' }}
              alt=''
            />
            <footer>
              <h5>{title}</h5>
              <button className='like-btn'>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
