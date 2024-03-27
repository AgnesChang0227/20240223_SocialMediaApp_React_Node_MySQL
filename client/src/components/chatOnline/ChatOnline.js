import React from 'react';
import "./chatOnline.scss"

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineContainer">
          <img className="chatOnlineImg"
               src="https://loremflickr.com/640/480?lock=642503346749440" alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Name</span>
      </div>
      
    </div>
  );
};

export default ChatOnline;