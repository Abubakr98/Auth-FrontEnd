import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import User from './Components/User'
import Login from './Components/Login'
import Registration from './Components/Reg'

class App extends React.Component {
  state = {
    user: null
  }
  storageUser=(user)=>{
    this.setState({user:user})
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login/">sign in</Link>
                </li>
                <li>
                  <Link to="/registration/">registration</Link>
                </li>
              </ul>
            </nav>
            <Route path="/" exact
              component={() => <User state={this.state.user} storeUser={this.storageUser} />} />
            <Route path="/login/" exact component={() => <Login state={this.state.user} storeUser={this.storageUser} />}  />
            <Route path="/registration/" exact component={Registration} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
