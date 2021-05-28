import React from "react";

import "./Feed.scss";

import Tweet from "../Tweet/Tweet";

const Feed = (props) => {
  return (
    <div className="feed">
      <div className="tweets">
        {props.tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.tweet_id}
              name={tweet.user_name}
              email={tweet.user_email}
              description={tweet.description}
              tweet_id={tweet.tweet_id}
              user_email={props.email}
              deleteTweet={props.deleteTweet}
              setTweetChange={props.setTweetChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
