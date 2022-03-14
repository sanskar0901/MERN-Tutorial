import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "../pages/login.page";
import Signup from "../pages/signup.page";
import Task from "../pages/task.page";

const Navigations = () => {
  const state = useSelector(state => state)

  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if(state.user != null){
        setIsLoggedIn(true)
    }else{
        setIsLoggedIn(false)
    }
  },[state])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isloggedIn ? (
            <>
              <Route exact path="/" element={<Task />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
            <Route exact path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navigations;
