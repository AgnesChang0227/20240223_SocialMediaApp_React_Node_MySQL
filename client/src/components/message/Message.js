import React from 'react';
import "./message.scss"

const Message = ({own}) => {
  return (
    <div className={own?"message own":"message"}>
      <div className="messageTop">
        {!own&&<img className="messageImg"
                    src="https://loremflickr.com/640/480?lock=6425033467494400" alt=""/>
        }
                <p className="messageText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolorum eligendi error facilis inventore labore, laudantium minus numquam obcaecati, officia pariatur porro qui quia quis quisquam rem tempore temporibus, voluptatum.</p>
        {own&&<img className="messageImg"
                   src="https://loremflickr.com/640/480?lock=6425033467494400" alt=""/>
        }
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;