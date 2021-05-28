import React from "react";

import Button from "../Button/Button";

import "./MenuBar.scss";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/Search";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import MessageIcon from "@material-ui/icons/EmailOutlined";
import BookmarkIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import ProfileIcon from "@material-ui/icons/PersonOutlineOutlined";
import MoreIcon from "@material-ui/icons/MoreHorizOutlined";
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";
import TwitterIcon from "@material-ui/icons/Twitter";
import TweetIcon from "@material-ui/icons/CreateOutlined";

import { NavLink } from "react-router-dom";

const MenuBar = (props) => {
  return (
    <div className="menu-bar">
      <div className="topside">
        <TwitterIcon className="logo" />
        <NavLink className="nav" to="/" activeClassName="selected" exact>
          <button className="menu-button">
            <HomeIcon className="icon" />
            <span>Home</span>
          </button>
        </NavLink>
        <button className="menu-button">
          <SearchIcon className="icon" />
          <span>Explore</span>
        </button>
        <button className="menu-button">
          <NotificationIcon className="icon" />
          <span>Notifications</span>
        </button>
        <button className="menu-button">
          <MessageIcon className="icon" />
          <span>Messages</span>
        </button>
        <button className="menu-button">
          <BookmarkIcon className="icon" />
          <span>Bookmarks</span>
        </button>
        <button className="menu-button">
          <ListIcon className="icon" />
          <span>Lists</span>
        </button>
        <NavLink className="nav" to="/profile" activeClassName="selected">
          <button className="menu-button">
            <ProfileIcon className="icon" />
            <span>Profile</span>
          </button>
        </NavLink>
        <button className="menu-button">
          <MoreIcon className="icon" />
          <span>More</span>
        </button>

        <Button onClick={props.showModalHandler} class="solid tweet-button">
          <TweetIcon className="icon" />
          <span>Tweet</span>
        </Button>
      </div>
      <div className="botside">
        <div className="profile">
          <div className="avatar"></div>
          <div className="profile-data">
            <strong>{props.name}</strong>
            <span>@{props.name}</span>
          </div>
        </div>

        <LogoutIcon className="logout-icon" onClick={props.logout} />
      </div>
    </div>
  );
};

export default MenuBar;
