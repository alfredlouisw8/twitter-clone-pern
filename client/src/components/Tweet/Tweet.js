import React, { useState } from "react";

import CommentIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import RetweetIcon from "@material-ui/icons/LoopOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import "./Tweet.scss";

import TweetModal from "../../components/TweetModal/TweetModal";

const Tweet = (props) => {
  const [show, setShow] = useState(false);

  const showModalHandler = () => {
    setShow(true);
  };

  const hideModalHandler = () => {
    setShow(false);
  };
  return (
    <div className="tweet">
      <TweetModal
        show={show}
        handleClose={hideModalHandler}
        description={props.description}
        tweet_id={props.tweet_id}
        setTweetChange={props.setTweetChange}
      />
      <div className="body">
        <div className="avatar" />

        <div className="content">
          <div className="header">
            <div className="tweet-info">
              <strong>{props.name}</strong>
              <span>@{props.name}</span>
              <div className="dot"></div>
              <time>26 May 2021</time>
            </div>
            {props.user_email === props.email ? (
              <div className="tweet-action">
                <div onClick={showModalHandler} className="icon-container">
                  <EditIcon className="icon" />
                </div>

                <div
                  onClick={() => props.deleteTweet(props.tweet_id)}
                  className="icon-container"
                >
                  <DeleteIcon className="icon" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <p className="description">{props.description}</p>

          <div className="icons">
            <div className="status">
              <div className="icon-container">
                <CommentIcon className="icon" />
              </div>
              18
            </div>
            <div className="status">
              <div className="icon-container">
                <RetweetIcon className="icon" />
              </div>
              18
            </div>
            <div className="status">
              <div className="icon-container">
                <LikeIcon className="icon" />
              </div>
              18
            </div>
            <div className="status">
              <div className="icon-container">
                <ShareIcon className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
