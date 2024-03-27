import React, {useContext} from 'react';
import "./conversation.css"
import {AuthContext} from "../../context/authContext";

const Conversation = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className={"conversation"}>
      <img src={currentUser.profilePic} alt="" className="conversationImg"/>
      <span className="conversationName">Name</span>
    </div>
  );
};

export default Conversation;