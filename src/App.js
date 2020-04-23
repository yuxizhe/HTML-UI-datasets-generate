import React from 'react';
import './App.css';

import RandomComponent from './components';

function App() {
  return (
    <div className="App">
      {
        [...Array(20)].map(() => <RandomComponent />)
      }
    </div>
  );
}

export default App;
