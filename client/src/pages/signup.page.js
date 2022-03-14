import React from "react";
import { Helmet } from "react-helmet";

import SignupComponent from "../components/Signup/Signup.component";

function Signup() {
  return (
    <div>
      <Helmet>
        <title>Todo | Signup</title>
      </Helmet>
      
      <SignupComponent />
    </div>
  );
}

export default Signup;
