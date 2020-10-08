import React from 'react';
import logo from './logo.svg';
import Counter from './Counter';
import Fetch from './Fetch';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello, world!</p>
      <Counter />
      <Fetch />
    </header>
  </div>
);

export default App;
