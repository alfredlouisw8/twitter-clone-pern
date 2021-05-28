import React, { useState, useEffect, useContext } from "react";
import Feed from "../../components/Feed/Feed";

import "./HomePage.scss";

import FlareIcon from "@material-ui/icons/FlareOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import GifIcon from "@material-ui/icons/GifOutlined";
import PollIcon from "@material-ui/icons/PollOutlined";
import EmojiIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";
import PublicIcon from "@material-ui/icons/PublicOutlined";

import Button from "../../components/Button/Button";

import TextareaAutosize from "react-textarea-autosize";

import { QueryContext } from "../Layout/Layout";

const HomePage = (props) => {
  const [tweets, setTweets] = useState([]);
  const [tweetChange, setTweetChange] = useState(false);
  const query = useContext(QueryContext);

  async function getTweets() {
    try {
      let response;
      console.log(query);
      if (query === "") {
        response = await fetch("http://localhost:5000/tweets", {
          method: "GET",
          headers: { token: localStorage.token },
        });
      } else if (query !== "") {
        response = await fetch(`http://localhost:5000/tweets?search=${query}`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
      }

      const parseRes = await response.json();

      setTweets(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTweets();
    setTweetChange(false);
  }, [tweetChange, query]);
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState("");

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description: message };
      const response = await fetch("http://localhost:5000/tweets", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      setTweets([{ ...parseRes, user_name: props.name }, ...tweets]);
      setMessage("");
      setFocused(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleSort = () => {
    const reverseTweets = [...tweets].reverse();
    setTweets(reverseTweets);
  };

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
    <div className="home-page">
      <div className="top-header">
        <strong>Home</strong>
        <button className="flare-icon">
          <FlareIcon onClick={toggleSort} />
        </button>
      </div>
      <div className="tweet-box">
        <div className="body">
          <div className="avatar" />
          <div className="content">
            <form onSubmit={onSubmitForm}>
              <TextareaAutosize
                maxRows={6}
                minRows={2}
                onChange={(e) => onTextChange(e)}
                value={message}
                onClick={() => {
                  setFocused(true);
                }}
                placeholder="What's happening?"
              ></TextareaAutosize>

              {focused ? (
                <div className="reply-container">
                  <div className="reply-setting">
                    <PublicIcon />
                    <span>Everyone can reply</span>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="bottom-content">
                <div className="icon-container">
                  <button className="icon">
                    <ImageIcon />
                  </button>
                  <button className="icon">
                    <GifIcon />
                  </button>
                  <button className="icon">
                    <PollIcon />
                  </button>
                  <button className="icon">
                    <EmojiIcon />
                  </button>
                  <button className="icon">
                    <CalendarIcon />
                  </button>
                </div>

                <div>
                  <span
                    className={`tweet-length ${
                      message.length >= 240 ? "max-length" : ""
                    }`}
                  >
                    {message.length} / 240
                  </span>
                  <Button
                    disabled={
                      message.length === 0 || message.length > 240
                        ? true
                        : false
                    }
                    class="solid"
                  >
                    Tweet
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <Feed
        tweets={tweets}
        deleteTweet={deleteTweet}
        email={props.email}
        setTweetChange={setTweetChange}
      />
    </div>
  );
};

export default HomePage;
