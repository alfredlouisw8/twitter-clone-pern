import React from "react";

import "./List.scss";

import SettingIcon from "@material-ui/icons/SettingsOutlined";

const List = (props) => {
  return (
    <div className="list">
      <div className="item top-item">
        <span className="title">{props.title}</span>
        {props.setting ? (
          <div className="setting-icon">
            <SettingIcon />
          </div>
        ) : (
          ""
        )}
      </div>

      {props.elements.map((element, index) => (
        <div className="item" key={index}>
          {element}
        </div>
      ))}

      <div className="item">
        <span className="show-more">Show more</span>
      </div>
    </div>
  );
};

export default List;
