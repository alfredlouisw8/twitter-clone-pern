import React, { useState } from "react";

import { Modal } from "react-bootstrap";

import "./TweetModal.scss";

import CloseIcon from "@material-ui/icons/CloseOutlined";

import TextareaAutosize from "react-textarea-autosize";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import GifIcon from "@material-ui/icons/GifOutlined";
import PollIcon from "@material-ui/icons/PollOutlined";
import EmojiIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";
import PublicIcon from "@material-ui/icons/PublicOutlined";

import Button from "../Button/Button";

import "bootstrap/dist/css/bootstrap.min.css";

const TweetModal = (props) => {
  const [description, setDescription] = useState(props.description);
  const onEditTweet = async (id) => {
    try {
      const body = { description: description };
      const response = await fetch(`http://localhost:5000/tweets/${id}`, {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await response.json();
      props.setTweetChange(true);
      props.handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  const onClose = () => {
    setDescription(props.description);
    props.handleClose();
  };

  return (
    <div className="tweet-modal">
      <Modal show={props.show} onHide={onClose}>
        <Modal.Header>
          <div onClick={props.handleClose} className="icon-container">
            <CloseIcon className="icon" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="tweet-box">
            <div className="body">
              <div className="avatar" />
              <div className="content">
                <TextareaAutosize
                  maxRows={6}
                  minRows={2}
                  placeholder="What's happening?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></TextareaAutosize>

                <div className="reply-container">
                  <div className="reply-setting">
                    <PublicIcon />
                    <span>Everyone can reply</span>
                  </div>
                </div>

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
                        description.length >= 240 ? "max-length" : ""
                      }`}
                    >
                      {description.length} / 240
                    </span>
                    <Button
                      disabled={
                        description.length === 0 || description.length > 240
                          ? true
                          : false
                      }
                      onClick={() => onEditTweet(props.tweet_id)}
                      class="solid"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TweetModal;
