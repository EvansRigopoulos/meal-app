import React from 'react';
import { useGlobalContext } from '../Context';

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  const {
    strMealThumb: image,
    strMeal: title,
    strInstructions: text,
    strSource: source,
  } = selectedMeal;

  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-content'>
          <img src={image} className='img modal-img' alt={title} />
          <h4>{title}</h4>
          <p>Cooking instructions</p>
          <p>{text}</p>
          <a href={source} target='blank'>
            Original source
          </a>
          <button className='btn btn-hipster close-btn' onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
