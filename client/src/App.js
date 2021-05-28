import Layout from "./pages/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import "./App.scss";

import React, { useState, useEffect } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!isAuthenticated ? <LandingPage /> : <Layout setAuth={setAuth} />}
        </Route>
        <Route path="/login" exact>
          {!isAuthenticated ? (
            <LoginPage setAuth={setAuth} />
          ) : (
            <Redirect to="/"></Redirect>
          )}
        </Route>
        <Route path="/signup" exact>
          {!isAuthenticated ? (
            <SignupPage setAuth={setAuth} />
          ) : (
            <Redirect to="/"></Redirect>
          )}
        </Route>
        <Route path="/profile" exact>
          {isAuthenticated ? <Layout setAuth={setAuth} /> : <LoginPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
