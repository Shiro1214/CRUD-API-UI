//import logo from './logo.svg';
import React from 'react';
import './App.css';
import PersonList from './components/PersonList';
import SearchComponent from './components/SearchComponent';
import PersonCreate from './components/PersonCreate';
//the app will run and get a list of person
function App() {
  return (
    <div className="App">
      <SearchComponent />
      <PersonList />
      <PersonCreate />
    </div>
  );
}

export default App;