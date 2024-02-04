// ChatSidebar.js
import React from "react";
import { BiPlus, BiComment } from "react-icons/bi";

const ChatSidebar = ({ createNewChat, uniqueTitles, backToHistoryPrompt }) => {
  return (
    <section className="sidebar">
      <div className="sidebar-header" onClick={createNewChat} role="button">
        <BiPlus size={20} />
        <button>New Chat</button>
      </div>
      <div className="sidebar-history">
        {uniqueTitles.length > 0 && <p>Today</p>}
        <ul>
          {uniqueTitles?.map((uniqueTitle, idx) => (
            <li key={idx} onClick={() => backToHistoryPrompt(uniqueTitle)}>
              <BiComment />
              {uniqueTitle.slice(0, 18)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChatSidebar;
