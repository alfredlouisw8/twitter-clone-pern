import React, { useState } from "react";

import TwitterIcon from "@material-ui/icons/Twitter";

import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import "./SignupPage.scss";

const SignupPage = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
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
    <div className="signup-page">
      <div className="signup-container">
        <TwitterIcon />

        <h1>Sign up for Twitter</h1>

        <form onSubmit={onSubmitForm}>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              onChange={(e) => onChange(e)}
              placeholder="Name"
            />
          </div>

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

          <Button class="solid">Sign up</Button>
        </form>

        <Link to="/login">Log in to Twitter</Link>
      </div>
    </div>
  );
};

export default SignupPage;
