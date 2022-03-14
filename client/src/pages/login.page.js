import React from "react";
import { Helmet } from "react-helmet";

import LoginComponent from "../components/Login/Login.component";

function login() {
  return (
    <div>
      <Helmet>
        <title>Todo | Login</title>
      </Helmet>

      <LoginComponent />
    </div>
  );
}

export default login;
