import React, { useState } from "react";

import TwitterIcon from "@material-ui/icons/Twitter";

import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

import "./LoginPage.scss";

import { toast } from "react-toastify";

const LoginPage = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        props.setAuth(true);
        toast.success("login authenticated");
      } else {
        props.setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <TwitterIcon />

        <h1>Log in to Twitter</h1>
        <form onSubmit={onSubmitForm}>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              onChange={(e) => onChange(e)}
              placeholder="Email"
            />
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              onChange={(e) => onChange(e)}
              placeholder="Password"
            />
          </div>

          <Button class="solid">Log in</Button>
        </form>

        <Link to="/signup">Sign up for Twitter</Link>
      </div>
    </div>
  );
};

export default LoginPage;
