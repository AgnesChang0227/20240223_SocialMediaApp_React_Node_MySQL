import React from 'react';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import "./lastActivities.scss"

const data = [
  {
    userId: "1",
    name: "test2",
    profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    createdAt: [2007, 0, 29],
  },
  {
    userId: "1",
    name: "test2",
    profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastEdited: [2007, 0, 29],
  },
  {
    userId: "1",
    name: "test2",
    profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastEdited: [2007, 0, 29],
  },
  {
    userId: "1",
    name: "test2",
    profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastEdited: [2007, 0, 29],
  },
  {
    userId: "1",
    name: "test2",
    profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    createdAt: [2007, 0, 29],
  },
]
const LastActivities = () => {


  return (
    <div className="act">
      <span>Latest Activities</span>
      {data && data.map(act => (
        <div className="user">
          <div className="userInfo">
            <img src={act.profilePic}/>
            <p>
              <span>
                <Link className="link" to="/">{act.name}</Link>
              </span>
              {act.createdAt ? " updated their profile !" : " shared a new post !"}
            </p>
          </div>
          <span>{moment(act.createdAt || act.lastEdited).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default LastActivities;