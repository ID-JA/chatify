import { useMantineTheme, Text, Avatar } from "@mantine/core";
import React from "react";

// import "./ChatHeader.css";
import useStyles from "./ChatHeader.styles.js";

const ChatHeader = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <div
      className={classes.ChatHeader}
      style={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
    >
      <Avatar
        src="https://images.unsplash.com/photo-1657299170222-1c67dc056b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        size="md"
        radius="xl"
      />
      <div className={classes.chatHeaderUserInfo}>
        <div className="chatHeader__userInfo__name">
          <Text size={17}>John Doe</Text>
        </div>
        <div className="chatHeader__userInfo__status">
          <Text size={11}>Online</Text>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
