import React, { useEffect, useState } from "react";
import { Avatar, Text } from "@mantine/core";
import { format } from "timeago.js";

import { useQuery } from "react-query";
import axiosInstance from "../../axios";

import useStyles from "./SideChat.styles.js";
import useFetch from "../../hooks/useFetch";

const SideChat = ({ conversation, selectSideChat, currentUserID }) => {
  const { classes } = useStyles();
  const { createdAt, lastMessage, _id, users } = conversation;

  const userID = users.find((item) => item._id !== currentUserID);

  const { data, isLoading, error } = useFetch(`/api/users?userID=${userID}`);

  console.log(data);

  return (
    <div className={classes.sideChat} onClick={selectSideChat}>
      {/* <div className={classes.sideChatPictureWrapper}> */}
      <Avatar
        src={data?.picture.pictureURL}
        // className={classes.sideChatPicture}
        alt={data?.username}
        radius="xl"
        size="md"
      />
      {/* </div> */}
      <div className={classes.sideChatMiddle}>
        <Text className={classes.sideChatUsername}>{data?.username}</Text>
        <Text className={classes.sideChatLastMessage}>{lastMessage}</Text>
      </div>
      <div className={classes.sideChatRight}>
        <Text size="xs" className={classes.lastMessageTimestamp}>
          {/* {lastMessageTimestamp} */}
          {format(createdAt)}
        </Text>
        <Text className={classes.totalMessagesNotSeen}>
          {/* {totalMessagesNotSeen} */}1
        </Text>
      </div>
    </div>
  );
};

export default SideChat;
