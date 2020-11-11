import React from 'react';
import Contexts from '../hooks/contexts';
import logo from './logo.svg';
import Fetch from './Fetch';
import Form from './Form';
import './App.css';

/** ルート要素 コンポーネント。 */
const Component: React.FC = () => (
  <Contexts>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, world!</p>
        <Form />
        <Fetch />
      </header>
    </div>
  </Contexts>
);
Component.displayName = 'App';

export default Component;
