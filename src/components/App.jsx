import React, { useState } from 'react';
import Api from './Api';
import CardModel from './CardModel';

const App = () => {
  const [cards, setCards] = useState([]);

  return (
    <div className="app-container">
     <div className="content-wrapper">
      <h1 className="text title">Семинары</h1>
      <Api onDataLoaded={setCards} />
      <CardModel cards={cards} setCards={setCards} />
    </div>
    </div>
  );
};

export default App;