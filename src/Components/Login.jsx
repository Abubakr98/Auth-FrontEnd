import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Login.css';
import axios from 'axios';

const _updateLocalStorage = (data) => { // Saving user data in localStorege
  let user = JSON.stringify(data);
  localStorage.setItem('user', user);
}
const Login = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    rembMe: false
  })
  const emailHendler = e => {
    setState({ ...state, email: e.target.value });
  }
  const passwordHendler = e => {
    setState({ ...state, password: e.target.value });
  }
  const rembMeHendler = (e) => {
    setState({ ...state, rembMe: e.target.checked });
  }
  const sendData = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/signin', state)
      .then((response) => {
        if (response.data.hasOwnProperty('message')) {
          alert(response.data.message);
        } else {
          if (state.rembMe) {
            _updateLocalStorage(response.data);
          } else {
            props.storeUser(response.data)
          }
          props.history.push('/')
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className="user login">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" value={state.email} onChange={emailHendler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" value={state.password} onChange={passwordHendler} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
        </div>
        <div className="form-group form-check">
          <input checked={state.rembMe} onChange={rembMeHendler} type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default withRouter(Login);
export { _updateLocalStorage }
