import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import './User.css';
import { _updateLocalStorage } from './Login';

class User extends React.Component {
  state = {
    user: null
  }
  getUser = (user) => {
    const options = {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + user.accessToken },
      url: 'http://localhost:3000/user/' + user.userId,
    };
    axios(options)
      .then((response) => {
        this.setState({ user: response.data })
      })
      .catch((response) => {
        let err = { response };
        if (err.response.response.data.message === 'Token expired!') {
          this.getRefreshToken(user);
        } else {
          return response;
        }
      })
  }
  getRefreshToken = (user) => {
    let data = JSON.stringify({
      "refreshToken": user.refreshToken
    });
    fetch('http://localhost:3000/refresh-tokens', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(json => {
        if (json.message !== 'Refresh token expired!') {
          _updateLocalStorage({ ...json, userEmail: user.userEmail, userId: user.userId });
          let newUserData = JSON.parse(localStorage.getItem('user'));
          this.getUser(newUserData)
        } else if (json.message === 'Refresh token expired!') {
          this.props.history.push('/login/');
        }
      })
      .catch((response) => {
        let err = { response };
        if (err.response.response.data.message === 'Refresh token expired!') {
          this.props.history.push('/login/')
        }
        console.log(err);
      });
  }
  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (this.props.state) {
      user = this.props.state;
    }
    if (user) {
      this.getUser(user);
    } else {
      this.props.history.push('/login/')
    }
  }
  signOut=()=>{
    localStorage.removeItem('user');
    this.props.storeUser(null)
    this.props.history.push('/login/')
  }
  render() {
    let { user } = this.state;
    return (
      user ? (
        <div className="user">
          <h4>
            User ID: {user._id}
          </h4>
          <h4>
            User email: {user.email}
          </h4>
          {
            <button type="button" onClick={this.signOut} className="btn btn-info" style={{ marginTop: "10px" }}>Sign out</button>
          }
        </div>
      ) : ("loading...")
    )
  }
}

export default withRouter(User);
