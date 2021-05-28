import React from "react";

import TwitterIcon from "@material-ui/icons/Twitter";

import Button from "../../components/Button/Button";

import { Link } from "react-router-dom";

import "./LandingPage.scss";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="right-pane">
          <TwitterIcon />

          <h1>Happening now</h1>
          <h2>Join Twitter today.</h2>

          <Link to="/signup">
            <Button class="solid">Sign up</Button>
          </Link>
          <Link to="/login">
            <Button class="outline">Log in</Button>
          </Link>
        </div>
        <div className="left-pane">
          <TwitterIcon />
        </div>
      </div>

      <div className="footer">
        <span>About</span>
        <span>Help Center</span>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
      </div>
    </div>
  );
};

export default LandingPage;
