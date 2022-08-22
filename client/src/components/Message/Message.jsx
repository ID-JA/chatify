import React from "react";
import { Avatar, Text, Tooltip } from "@mantine/core";

// import "./Message.css";
import useStyles from "./Message.styles.js";

const Message = ({ own, text, picture, createdAt, seen }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.message, { [classes.ownMessage]: own })}>
      {!own && <Avatar src={picture} size="md" radius="xl" />}
      <Tooltip
        label={createdAt}
        position="right"
        color="#3C4043"
        style={{ fontSize: "10px" }}
      >
        <div
          className={cx(
            classes.messageText,
            { [classes.ownBgColor]: own },
            { [classes.notOwnBgColor]: !own }
          )}
        >
          <Text size={13} color="#fff">
            {text}
          </Text>
        </div>
      </Tooltip>
    </div>
  );
};

export default Message;
