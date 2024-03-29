import { Avatar, Text } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';

import useStyles from './Profile.styles';

export const Profile = () => {
  const { username, email, picture } = useSelector((store) => store.user.user);
  const { classes } = useStyles();

  return (
    <div className={classes.profile}>
      <Avatar src={picture.pictureURL} size="250px" className={classes.avatar} />
      <Text className={classes.usernameEmail}>
        {username}
        <Text>{email}</Text>
      </Text>
      <Text className={classes.logoutButton}>Logout</Text>
    </div>
  );
};
