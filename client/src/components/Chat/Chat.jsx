import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "../Message/Message.jsx";

// import "./Chat.css";
import {
  createStyles,
  ScrollArea,
  TextInput,
  Paper,
  Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  mainContainer: {
    height: "calc(100vh - 122px)",
    maxHeight: "calc(100vh - 122px)",
    // overflowY: "auto",
    overflowX: "hidden",
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    position: "relative",
    boxSizing: "border-box",
  },
  messagesBox: {
    marginTop: "59.39px",
    // marginBottom: "59.39px",
    paddingLeft: "10px",
    height: "100%",
    maxHeight: "100%",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      width: "6px",
    },

    "::-webkit-scrollbar-track": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[1],
      borderRadius: "10px",
    },

    "::-webkit-scrollbar-thumb": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[4],
      borderRadius: "10px",
    },
  },
  inputBox: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "80%",
    marginInline: "auto",
    display: "flex",
    alignItems: "center",
  },
}));

const Chat = () => {
  const { classes } = useStyles();
  const scrollRef = useRef();

  useEffect(() => {
    console.log("rendered");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
          <TextInput
            placeholder="Enter your message"
            style={{ flex: 1, marginRight: "7px" }}
          />
          <Button>Send</Button>
        </div>
      </div>
    </Paper>
  );
};

export default Chat;
