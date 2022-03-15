import React, { useState } from "react";
import classes from "./Signup.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state';

function SignupComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const { setUser } = bindActionCreators(actionCreators, dispatch);

  const handleSubmit = () => {
    let data = {
      email,
      password,
      username: userName,
    };

    if (email && password && userName) {
      axios.post(" https://to69do.herokuapp.com/auth/signup", data)
        .then(res => {
          setUser(res.data.userId, res.data.name, res.data.email)
        })
    }

  };

  return (
    <div>
      <div className={classes.majorContainer}>
        <div className={classes.formStyle}>
          <h1>Todo List Signup</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Signup"
              style={{ backgroundColor: "rgb(60, 187, 56)" }}
            />
          </form>
          <br />
          <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupComponent;
