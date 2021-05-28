import React from "react";

import Button from "../Button/Button";

import "./FollowSuggestion.scss";
import CloseIcon from "@material-ui/icons/CloseOutlined";

const FollowSuggestion = (props) => {
  return (
    <div className="follow-suggestion">
      <div>
        {props.topic ? "" : <div className="avatar" />}

        <div className="info">
          <strong>{props.name}</strong>
          <span>{props.nickname}</span>
        </div>
      </div>

      <div>
        <Button class="follow-button outline">Follow</Button>

        {props.topic ? (
          <button className="close-icon">
            <CloseIcon />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FollowSuggestion;
