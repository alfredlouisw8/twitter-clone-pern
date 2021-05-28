import React, { useContext } from "react";
import StickyBox from "react-sticky-box";

import "./SideBar.scss";
import SearchIcon from "@material-ui/icons/Search";
import List from "../List/List";
import FollowSuggestion from "../FollowSuggestion/FollowSuggestion";
import TrendSuggestion from "../TrendSuggestion/TrendSuggestion";

import { QueryContext } from "../../pages/Layout/Layout";

const SideBar = (props) => {
  const query = useContext(QueryContext);
  return (
    <div className="side-bar">
      <div className="search-wrapper">
        <input
          className="search-input"
          placeholder="Search Twitter"
          value={query}
          onChange={(e) => props.onQueryChange(e)}
        />
        <SearchIcon className="search-icon" />
      </div>

      <StickyBox>
        <div className="body">
          <List
            title="Trends for you"
            setting={true}
            elements={[
              <TrendSuggestion name="#Tag 1" nickname="2,500 Tweets" />,
              <TrendSuggestion name="#Tag 2" nickname="2,500 Tweets" />,
              <TrendSuggestion name="#Tag 3" nickname="2,500 Tweets" />,
              <TrendSuggestion name="#Tag 4" nickname="2,500 Tweets" />,
              <TrendSuggestion name="#Tag 5" nickname="2,500 Tweets" />,
            ]}
          />
          <List
            title="Who to follow"
            elements={[
              <FollowSuggestion name="Test 1" nickname="@test1" />,
              <FollowSuggestion name="Test 2" nickname="@test2" />,
              <FollowSuggestion name="Test 3" nickname="@test3" />,
            ]}
          />

          <List
            title="Topics to follow"
            elements={[
              <FollowSuggestion
                name="Topic 1"
                nickname="Topic 1"
                topic={true}
              />,
              <FollowSuggestion
                name="Topic 2"
                nickname="Topic 1"
                topic={true}
              />,
              <FollowSuggestion
                name="Topic 3"
                nickname="Topic 1"
                topic={true}
              />,
              <FollowSuggestion
                name="Topic 4"
                nickname="Topic 1"
                topic={true}
              />,
              <FollowSuggestion
                name="Topic 5"
                nickname="Topic 1"
                topic={true}
              />,
            ]}
          />

          <div className="footer">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
            <span>Ads Info</span>
            <span>More</span>
          </div>
        </div>
      </StickyBox>
    </div>
  );
};

export default SideBar;
