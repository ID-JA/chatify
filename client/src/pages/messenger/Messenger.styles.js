import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  userInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginBottom: "10px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
  },
  inputBox: {
    marginTop: "20px",
    marginBottom: "20px",
    marginInline: "auto",
    paddingBottom: "20px",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
  },
  onlineFriendsWrapper: {
    marginTop: "20px",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
  },

  onlineFriends: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    overflowX: "auto",
  },

  sideChatWrapper: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  noChatSelectedWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  noChatSelectedSVG: {
    width: "300px",
    marginBottom: "40px",
  },
}));
