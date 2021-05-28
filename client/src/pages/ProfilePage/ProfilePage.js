import React, { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import Feed from "../../components/Feed/Feed";

import ArrowBackIcon from "@material-ui/icons/ArrowBackOutlined";

import "./ProfilePage.scss";

import { Link } from "react-router-dom";

const ProfilePage = (props) => {
  const [tweets, setTweets] = useState([]);

  const [tweetChange, setTweetChange] = useState(false);

  async function getTweets() {
    try {
      const response = await fetch("http://localhost:5000/users/tweets", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setTweets(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTweets();
    setTweetChange(false);
  }, [tweetChange]);

  const deleteTweet = async (id) => {
    try {
      await fetch(`http://localhost:5000/tweets/${id}`, {
        method: "DELETE",
        headers: {
          token: localStorage.token,
        },
      });

      setTweets(tweets.filter((tweet) => tweet.tweet_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="profile-page">
      <div className="top-header">
        <Link to="/">
          <ArrowBackIcon className="back-icon" />
        </Link>
        <div className="profile-info">
          <strong>{props.name}</strong>
          <span>{tweets.length} tweets</span>
        </div>
      </div>
      <div className="banner">
        <div className="avatar"></div>
      </div>

      <div className="profile-data">
        <Button class="outline edit-profile">Edit Profile</Button>
        <h1>{props.name}</h1>
        <h2>@{props.name}</h2>

        <div className="followage">
          <span>
            <strong>0 </strong> Following
          </span>
          <span>
            <strong>0 </strong> Followers
          </span>
        </div>
      </div>
      <div className="tab">Tweets</div>
      <Feed
        tweets={tweets}
        deleteTweet={deleteTweet}
        email={props.email}
        setTweetChange={setTweetChange}
      />
    </div>
  );
};

export default ProfilePage;
