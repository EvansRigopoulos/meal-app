import React from 'react';
import { useState } from 'react';
import { useGlobalContext } from '../Context';
const Search = () => {
  const [text, setText] = useState('');
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
    if (text) {
      setSearchTerm(text);
    }
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
      setText('');
    }
  };

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input
          //persisting the state value of text
          className='form-input'
          type='text'
          placeholder='type your favorite food'
          onChange={handleChange}
          value={text}
        ></input>
        <button className='btn' type='submit'>
          Search
        </button>
        <button
          className='btn btn-hipster'
          type='btn'
          onClick={fetchRandomMeal}
        >
          Surprise Me!
        </button>
      </form>
    </header>
  );
};

export default Search;
