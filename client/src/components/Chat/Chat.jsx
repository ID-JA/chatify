import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "../Message/Message.jsx";
import useStyles from "./Chat.styles.js";
import { useSelector } from "react-redux";

import axiosInstance from "../../axios";

// import "./Chat.css";
import { Paper, Textarea, TextInput } from "@mantine/core";

const Chat = ({ chat }) => {
  const { classes } = useStyles();
  const scrollRef = useRef();
  const { _id } = useSelector((store) => store.user.user);

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // get user to put it on chatHeader
  const getUser = async () => {
    const { data } = await axiosInstance.get(
      `/api/users?userID=${chat.users[0]}`
    );
    setUser(data);
  };
  // get all messages of current chat
  const getMessages = async () => {
    try {
      const res = await axiosInstance.get(`/api/messages/${chat?._id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getMessages();
  }, [chat]);

  // scroll to bottom of the chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // when user click 'Enter' to send a message
  const handleSendMessage = async () => {
    const newMsg = {
      chatID: chat?._id,
      from: _id,
      text: newMessage,
    };

    const { data } = await axiosInstance.post("/api/messages/new", newMsg);
    setMessages([...messages, data]);
    setNewMessage("");
  };

  return (
    <Paper withBorder>
      <div className={classes.mainContainer}>
        <ChatHeader user={user} />

        <div className={classes.messagesBox}>
          {messages?.map((item) => {
            return (
              <>
                <div ref={scrollRef} key={item._id}>
                  <Message own={item.from === _id} user={user} message={item} />
                </div>
              </>
            );
          })}
        </div>

        <div className={classes.inputBox}>
          {/* <Textarea
            placeholder="Enter your message"
            size="sm"
            style={{
              flex: 1,
              marginRight: "7px",
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          /> */}
          <TextInput
            placeholder="Enter your message..."
            style={{
              flex: 1,
              marginRight: "7px",
            }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          {/* <Button>Send</Button> */}
        </div>
      </div>
    </Paper>
  );
};

export default Chat;
