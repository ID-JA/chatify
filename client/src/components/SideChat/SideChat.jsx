import { Avatar, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { format } from 'timeago.js';
import axiosInstance from '../../axios';
import useStyles from './SideChat.styles';

export const SideChat = ({ conversation, currentUserID }) => {
  const { classes } = useStyles();
  const { createdAt, lastMessage, users } = conversation;

  const userID = users.find((item) => item._id !== currentUserID);

  const getUserById = async (userId) => {
    const { data } = await axiosInstance.get(`/api/users?userID=${userId}`);
    return data;
  };

  const { data } = useQuery(['userById', userID], () => getUserById(userID));

  return (
    <div className={classes.sideChat}>
      <Avatar src={data?.picture.pictureURL} alt={data?.username} radius="xl" size="md" />
      <div className={classes.sideChatMiddle}>
        <Text className={classes.sideChatUsername}>{data?.username}</Text>
        <Text className={classes.sideChatLastMessage}>{lastMessage}</Text>
      </div>
      <div className={classes.sideChatRight}>
        <Text size="xs" className={classes.lastMessageTimestamp}>
          {/* {lastMessageTimestamp} */}
          {format(createdAt)}
        </Text>
        {/* <Text className={classes.totalMessagesNotSeen}>
          1
        </Text> */}
      </div>
    </div>
  );
};
