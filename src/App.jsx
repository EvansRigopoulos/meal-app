import './App.css';
import React from 'react';

import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';
import Header from './components/Header';
import { useGlobalContext } from './Context';

function App() {
  const { showModal, favorites } = useGlobalContext();

  return (
    <main>
      <Header />
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
