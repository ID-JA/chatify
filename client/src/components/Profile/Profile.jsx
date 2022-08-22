import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Text } from "@mantine/core";

import useStyles from "./Profile.styles.js";

const Profile = () => {
  const { username, email, picture } = useSelector((store) => store.user.user);
  const { classes } = useStyles();

  return (
    <div className={classes.profile}>
      <Avatar
        src={picture.pictureURL}
        size="250px"
        className={classes.avatar}
      />
      <Text className={classes.usernameEmail}>
        {username}
        <Text>{email}</Text>
      </Text>
      <Text className={classes.logoutButton}>Logout</Text>
    </div>
  );
};

export default Profile;
