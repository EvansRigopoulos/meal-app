import React from 'react';
import { useGlobalContext } from '../Context';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useGlobalContext();

  return (
    <section className='favorites'>
      <div className='favorites-content'>
        <h5>Favorites</h5>
        <div className='favorites-container'>
          {favorites.map((singleFavorite) => {
            const {
              idMeal,
              strMeal: title,
              strMealThumb: image,
            } = singleFavorite;
            return (
              <div key={idMeal} className='favorite-item'>
                <h6>{title}</h6>
                <img src={image} className='favorites-img' alt={title} />
                <button
                  className='remove-btn'
                  onClick={() => removeFromFavorites(idMeal)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
