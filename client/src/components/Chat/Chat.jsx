import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "../Message/Message.jsx";
import useStyles from "./Chat.styles.js";

// import "./Chat.css";
import { Paper, Textarea } from "@mantine/core";

const Chat = () => {
  const { classes } = useStyles();
  const scrollRef = useRef();

  useEffect(() => {
    console.log("rendered");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = (e) => {
    console.log("handle message send");
  };

  return (
    <Paper withBorder>
      <div className={classes.mainContainer}>
        <ChatHeader />

        <div className={classes.messagesBox}>
          {new Array(8).fill(0).map((_, index) => (
            <>
              <div ref={scrollRef}>
                <Message
                  own={index % 2 === 0}
                  text="Hello there"
                  key={index}
                  picture="https://images.unsplash.com/photo-1657299170222-1c67dc056b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  createdAt={new Date(
                    "2022-08-19T12:49:50.951+00:00"
                  ).toLocaleString()}
                />
              </div>
            </>
          ))}
        </div>

        <div className={classes.inputBox}>
          <Textarea
            placeholder="Enter your message"
            size="sm"
            style={{
              flex: 1,
              marginRight: "7px",
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          {/* <Button>Send</Button> */}
        </div>
      </div>
    </Paper>
  );
};

export default Chat;
