import { Avatar, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { format } from 'timeago.js';

import useStyles from './Message.styles';

export const Message = ({ message, own, user }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.message, { [classes.ownMessage]: own })}>
      {!own && <Avatar src={user?.picture.pictureURL} size="md" radius="xl" />}
      <Tooltip
        label={format(message.createdAt)}
        position="right"
        color="#3C4043"
        style={{ fontSize: '10px' }}
      >
        <div
          className={cx(
            classes.messageText,
            { [classes.ownBgColor]: own },
            { [classes.notOwnBgColor]: !own }
          )}
        >
          <Text size={13} color="#fff">
            {message.text}
          </Text>
        </div>
      </Tooltip>
    </div>
  );
};
