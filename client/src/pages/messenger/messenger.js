import "./messenger.scss"
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Messenger = () => {

  return (
    <div className={`messenger`}>
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <div className="search">
            <SearchOutlinedIcon/>
            <input type="text" placeholder="Search..."/>
          </div>
          <Conversation/>
          <Conversation/>
          <Conversation/>
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message/>
            <Message/>
            <Message/>
            <Message own={true}/>
            <Message/>
          </div>
          <div className="chatBoxBottom">
            <textarea className="chatMessageInput" placeholder="write something..."></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">online</div>
        <ChatOnline/>
        <ChatOnline/>
        <ChatOnline/>
      </div>
    </div>
  );
};

export default Messenger;