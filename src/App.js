import React from 'react';
import './App.css';

import Input from './components/input';

function App() {
  return (
    <div className="App">
      {
        [...Array(50)].map(() => <Input />)
      }
    </div>
  );
}

export default App;
