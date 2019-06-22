import React, { useState } from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import './Login.css';

const Reg = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    password2: ''
  })
  const emailHendler = e => {
    setState({ ...state, email: e.target.value });
  }
  const passwordHendler = e => {
    setState({ ...state, password: e.target.value });
  }
  const passwordHendler2 = e => {
    setState({ ...state, password2: e.target.value });
  }
  
  const sendData = e => {
    e.preventDefault();
   if (state.password === state.password2) {    
    axios.post('http://localhost:3000/registration', {email:state.email,password:state.password})
      .then((response) => {
        if (response.data.hasOwnProperty('message')) {
          alert(response.data.message);
        } else {
          // _updateLocalStorage(response.data);
          alert('User successfully created!');
          props.history.push('/login/')
        }
      })
      .catch((error) => {
        console.log(error);
      })
   }else{
     alert('You entered two different passwords!')
   }
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
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm password</label>
          <input type="password" value={state.password2} onChange={passwordHendler2} className="form-control" id="exampleInputPassword2" placeholder="Confirm password" required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default withRouter(Reg);
