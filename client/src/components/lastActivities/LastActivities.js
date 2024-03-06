import React, {useContext} from 'react';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import "./lastActivities.scss"
import {AuthContext} from "../../context/authContext";
import {useQuery} from "@tanstack/react-query";
import {QueryContext} from "../../context/queryContext";

// const data = [
//   {
//     userId: "1",
//     name: "test2",
//     profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     createdAt: [2007, 0, 29],
//   },
//   {
//     userId: "1",
//     name: "test2",
//     profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastEdited: [2007, 0, 29],
//   },
//   {
//     userId: "1",
//     name: "test2",
//     profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastEdited: [2007, 0, 29],
//   },
//   {
//     userId: "1",
//     name: "test2",
//     profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     lastEdited: [2007, 0, 29],
//   },
//   {
//     userId: "1",
//     name: "test2",
//     profilePic: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     createdAt: [2007, 0, 29],
//   },
// ]
const LastActivities = () => {
  const {currentUser} = useContext(AuthContext);
  const {getLatestActs} = useContext(QueryContext)

  const {isPending, error, data} = useQuery(getLatestActs(currentUser.id, 5));

  return (
    isPending ?
      "Loading" :
      <div className="act">
        <span>Latest Activities</span>
        {data && data.map((act, index) => (
          <div className="user" key={index}>
            <div className="userInfo">
              <img src={act.profilePic}/>
              <p>
              <span>
                <Link className="link" to={`/profile/${act.userId}`}>{act.name}</Link>
              </span>
                {!!!act.createdAt ? " updated their profile !" : " shared a new post !"}
              </p>
            </div>
            <span>{moment(act.createdAt || act.lastEdited).fromNow()}</span>
          </div>
        ))}
      </div>


  );
};

export default LastActivities;