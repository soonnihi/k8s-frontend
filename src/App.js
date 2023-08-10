import './App.css';
import React from 'react';
import Router from './router/Router';
import { Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="dashBoard">
        <div className="sideBar">
          <div className="logo">
            <h1>영경좌들</h1>
            <h1>Velog</h1>
          </div>
          <ul>
            <li>
              <Link to="/" className="sideBarFont">Home</Link>
              </li>
            <li>
              <Link to="/about" className="sideBarFont">About</Link>
            </li>
          </ul>
        </div>
        <div className="section">
          <Router/>
        </div>
      </div>
    )
  }
}

export default App;
