import { Avatar, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { format } from 'timeago.js';

import useStyles from './ChatHeader.styles';

export const ChatHeader = ({ user }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <div
      className={classes.ChatHeader}
      style={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
    >
      <Avatar src={user?.picture.pictureURL} size="md" radius="xl" />
      <div className={classes.chatHeaderUserInfo}>
        <div className="chatHeader__userInfo__name">
          <Text size={17}>{user?.username}</Text>
        </div>
        <div className="chatHeader__userInfo__status">
          <Text size={11}>Last online {format(user?.lastOnline)}</Text>
        </div>
      </div>
    </div>
  );
};
