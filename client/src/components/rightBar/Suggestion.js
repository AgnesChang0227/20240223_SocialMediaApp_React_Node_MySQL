import React, {useContext, useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {QueryContext} from "../../context/queryContext";
import {AuthContext} from "../../context/authContext";
import {Link} from "react-router-dom";
import "./rightBar.scss"

const Suggestion = () => {
  const {currentUser} = useContext(AuthContext);
  const {getSuggestions} = useContext(QueryContext);
  const {isPending, error, data} = useQuery(getSuggestions(currentUser.id));
  const [showArr,setShowArr] = useState(data||[]);

  useEffect(()=>{
    if (data) setShowArr(data);
  },[data])

  const dismissHandler = (index)=>{
    const updatedData = [...showArr];
    updatedData.splice(index, 1);
    setShowArr(updatedData);
  }

  return (
    isPending ? "Loading"
      :
      <div className="item">
        <span>Suggestions For You</span>
        {showArr.slice(0,3).map((sug,index) => (
          <div key={index}>
            <div className="user">
              <div className="userInfo">
                <img
                  src={sug.profilePic}
                  alt=""
                />
                <span>
                  <Link to={`/profile/${sug.userId}`} className={"link"} style={{textDecoration:"none"}}>
                    {sug.name}
                  </Link>
                </span>
              </div>

              <div className="buttons">
                <button onClick={()=>dismissHandler(index)}>dismiss</button>
              </div>
            </div>
            <span>{!!sug.followedUserId
              ?"The followers of the users you are following"
              :`User with ${sug.followerCount} followers`}
            </span>
          </div>

        ))}
      </div>
  )
};

export default Suggestion;