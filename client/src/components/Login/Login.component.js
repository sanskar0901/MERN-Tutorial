import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state';

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { setUser } = bindActionCreators(actionCreators, dispatch);


  const handleSubmit = () => {
    let data = {
      email,
      password
    }

    if (email && password) {
      axios.post("http://localhost:5000/auth/signin", data)
        .then(res => {
          setUser(res.data._id, res.data.username, res.data.email)
        })
    }

    // console.log(data)
  }

  return (
    <div className={classes.majorContainer}>
      <div className={classes.formStyle}>
        <h1>Todo List Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
            value="Login"
            style={{ backgroundColor: "rgb(60, 187, 56)" }}
          />
        </form>
        <br />
        <Link to="/signup">signup</Link>
      </div>
    </div>
  );
}

export default LoginComponent;
