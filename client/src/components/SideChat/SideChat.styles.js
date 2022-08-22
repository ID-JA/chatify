import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  sideChat: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px 0",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? "#444" : "lightgray",
    },
  },
  sideChatPictureWrapper: {
    width: "40px",
    height: "40px",
    overflow: "hidden",
    marginRight: "10px",
  },
  sideChatPicture: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  sideChatMiddle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sideChatUsername: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[0]
        : theme.colors.dark[9],
  },
  sideChatLastMessage: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.dark[3],
  },
  sideChatRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  lastMessageTimestamp: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.dark[3],
  },
  totalMessagesNotSeen: {
    color: "#fff",
    backgroundColor: theme.colors.primary,
    borderRadius: "10px",
    width: "20px",
    height: "20px",
    marginTop: "5px",
    textAlign: "center",
    lineHeight: "20px",
  },
}));
