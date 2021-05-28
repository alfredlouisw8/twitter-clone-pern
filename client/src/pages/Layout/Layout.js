import React, { useState, useEffect } from "react";

import "./Layout.scss";

import MenuBar from "../../components/MenuBar/MenuBar";
import SideBar from "../../components/SideBar/SideBar";

import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import HomePage from "../../pages/HomePage/HomePage";

import HomeIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/Search";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import MessageIcon from "@material-ui/icons/EmailOutlined";

import { Switch, Route } from "react-router-dom";

import { toast } from "react-toastify";

export const QueryContext = React.createContext();

const Layout = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes[0].user_name);
      setEmail(parseRes[0].user_email);
    } catch (error) {
      console.error(error.message);
    }
  }

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    props.setAuth(false);
    toast.success("logout successful");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <QueryContext.Provider value={query}>
      <div className="layout">
        <div className="wrapper">
          <MenuBar name={name} logout={logout} />
          <div className="main">
            <Switch>
              <Route path="/" exact>
                <HomePage email={email} name={name} />
              </Route>
              <Route path="/profile">
                <ProfilePage name={name} email={email} />
              </Route>
            </Switch>

            <div className="bottom-menu">
              <HomeIcon className="icon active" />
              <SearchIcon className="icon" />
              <NotificationIcon className="icon" />
              <MessageIcon className="icon" />
            </div>
          </div>
          <SideBar onQueryChange={onQueryChange} />
        </div>
      </div>
    </QueryContext.Provider>
  );
};

export default Layout;
