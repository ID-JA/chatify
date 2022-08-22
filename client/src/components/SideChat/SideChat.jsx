import React from "react";
import { Text } from "@mantine/core";

import useStyles from "./SideChat.styles.js";

const SideChat = ({
  picture,
  username,
  lastMessage,
  lastMessageTimestamp,
  totalMessagesNotSeen,
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.sideChat}>
      <div className={classes.sideChatPictureWrapper}>
        <img src={picture} className={classes.sideChatPicture} alt={username} />
      </div>
      <div className={classes.sideChatMiddle}>
        <Text className={classes.sideChatUsername}>{username}</Text>
        <Text className={classes.sideChatLastMessage}>{lastMessage}</Text>
      </div>
      <div className={classes.sideChatRight}>
        <Text size="xs" className={classes.lastMessageTimestamp}>
          {lastMessageTimestamp}
        </Text>
        <Text className={classes.totalMessagesNotSeen}>
          {totalMessagesNotSeen}
        </Text>
      </div>
    </div>
  );
};

export default SideChat;
