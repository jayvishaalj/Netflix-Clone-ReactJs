import React from 'react';
import './App.css';
import Row from './components/Row/Row.component';
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <h1>Netflix Clone</h1>
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals}/>
    </div>
  );
}

export default App;
