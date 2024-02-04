import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './index.css';
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";

const Chat = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    setMessage(null);
    setText("");
    setCurrentTitle(null);
  };

  const backToHistoryPrompt = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text) return;

    setErrorText("");
    setIsResponseLoading(true);
    try {
      const data = await axios.post(`${'https://gpt-api-ohu3.onrender.com'}/api/chatbot`, { message: text });

      if (data.error) {
        setErrorText(data.error.message);
        setText("");
      } else {
        setErrorText(false);
      }

      if (!data.error) {
        setMessage(data.data.message);
        setTimeout(() => {
          scrollToLastItem.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
          });
        }, 1);
        setTimeout(() => {
          setText("");
        }, 2);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsResponseLoading(false);
    }
  };

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: text,
        },
        {
          title: currentTitle,
          role: message.role,
          content:
            message.content.charAt(0).toUpperCase() + message.content.slice(1),
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (prevChat) => prevChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((prevChat) => prevChat.title).reverse())
  );

  return (
    <div className="container">
      <ChatSidebar
        createNewChat={createNewChat}
        uniqueTitles={uniqueTitles}
        backToHistoryPrompt={backToHistoryPrompt}
      />
      <ChatMain
        currentTitle={currentTitle}
        currentChat={currentChat}
        scrollToLastItem={scrollToLastItem}
        errorText={errorText}
        isResponseLoading={isResponseLoading}
        text={text}
        setText={setText}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default Chat;




