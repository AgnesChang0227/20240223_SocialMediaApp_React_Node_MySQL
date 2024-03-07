import React, {useContext} from 'react';
import {Skeleton} from "@mui/material";
import {AuthContext} from "../../context/authContext";
import {QueryContext} from "../../context/queryContext";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

const Friends = () => {
  const {currentUser} = useContext(AuthContext);
  const {getFriends} = useContext(QueryContext);
  const {isPending, error, data} = useQuery(getFriends(currentUser.id))

  return (
    isPending ? "loading" :

      <div className="item">
        <span>Friends</span>
        {data.slice(0, 5).map(friend => (
          <div className="user">
            <div className="userInfo">
              <img src={friend.profilePic} alt=""/>
              {/*<div className="online" />*/}
              <span>{friend.name}</span>
            </div>
          </div>
        ))}
        <span style={{display: 'flex', alignItems: 'center'}}>
        <Link style={{marginLeft: 'auto'}} to="/friends">
          <span>...More</span>
        </Link>
      </span>
      </div>
  );
};

export default Friends;