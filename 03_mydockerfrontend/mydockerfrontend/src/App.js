import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo1" alt="logo" />
          <img src={logo} className="App-logo2" alt="logo" />
        </div>
        <p>
          Hello World with auto refreshing!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
	<p>
          and have fun!
        </p>
      </header>
    </div>
  );
}

export default App;
