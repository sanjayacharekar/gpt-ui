import React from "react";
import userIcon from '../assets/img/user.svg';
import gptIcon from '../assets/img/gptIcon.svg';

const ChatMain = ({ currentTitle, currentChat, scrollToLastItem, errorText, isResponseLoading, text, setText, submitHandler }) => {
  return (
    <section className="main">
      {!currentTitle && (
        <div className="empty-chat-container">
          <img src={gptIcon} width={45} height={45} alt="chat gpt logo" />
          <h1> GPT Clone</h1>
          <h3>How can I help you today?</h3>
        </div>
      )}
      <div className="main-header">
        <ul>
          {currentChat?.map((chatMsg, idx) => (
            <li key={idx} ref={scrollToLastItem}>
              <img
                src={chatMsg.role === "user" ? userIcon : gptIcon}
                alt={chatMsg.role === "user" ? "Face icon" : "ChatGPT icon"}
                style={{
                  backgroundColor: chatMsg.role === "user" && "#ECECF1",
                }}
              />
              <p>{chatMsg.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-bottom">
        {errorText && <p className="errorText">{errorText}</p>}
        <form className="form-container" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Send a message."
            spellCheck="false"
            value={
              isResponseLoading
                ? "Loading..."
                : text.charAt(0).toUpperCase() + text.slice(1)
            }
            onChange={(e) => setText(e.target.value)}
            readOnly={isResponseLoading}
          />
          {!isResponseLoading && (
            <button type="submit">Send</button>
          )}
        </form>
        <p>
          ChatGPT can make mistakes. Consider checking important
          information.
        </p>
      </div>
    </section>
  );
};

export default ChatMain;
