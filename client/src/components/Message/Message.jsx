import React from "react";
import { Text } from "@mantine/core";

import "./Message.css";

const Message = ({ own, text, picture, createdAt, seen }) => {
  return (
    <div className={`message ${own ? "ownMessage" : "notOwnMessage"}`}>
      {!own && (
        <div className="message_picture">
          <img src={picture} />
        </div>
      )}
      <div className={`message__text ${own ? "ownBgColor" : "notOwnBgColor"}`}>
        <Text size={13} className="message__content" color="#fff">
          {text}
        </Text>
        <Text size={12} className="message__createdAt" color="#fff">
          {createdAt}
        </Text>
      </div>
    </div>
  );
};

export default Message;
