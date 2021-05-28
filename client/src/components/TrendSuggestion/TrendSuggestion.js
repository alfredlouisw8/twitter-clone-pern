import React from "react";

import "./TrendSuggestion.scss";

import MoreIcon from "@material-ui/icons/MoreHorizOutlined";

const TrendSuggestion = (props) => {
  return (
    <div className="trend-suggestion">
      <div>
        <div className="info">
          <span>Trending in Indonesia</span>
          <strong>{props.name}</strong>
          <span>{props.nickname}</span>
        </div>
      </div>

      <button className="more-icon">
        <MoreIcon />
      </button>
    </div>
  );
};

export default TrendSuggestion;
