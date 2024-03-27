import * as React from 'react';
import Friend from "./Friend";
import "./friends.scss"
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {QueryContext} from "../../context/queryContext";
import {useQuery} from "@tanstack/react-query";

export default function Friends() {
  const {currentUser} = useContext(AuthContext);
  const {getFriends} = useContext(QueryContext);
  const {isPending, error, data} = useQuery(getFriends(currentUser.id));
  // console.log(data)

  return (
    <div className="friends">
      <h3>Friends: {!!data&&data.length}</h3>
      {isPending?"loading":
        data.map((user,index)=>(
          <div key={index} >
            <Friend user={user} />
          </div>
        ))
      }
    </div>

  );
}