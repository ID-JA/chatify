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
    position: "relative",
  },
  inputBoxSearchResult: {
    position: "absolute",
    top: "35px",
    left: 0,
    width: "100%",
    zIndex: 999,
    display: "flex",
    alignItems: "center",

    "& > .mantine-Avatar-root": { marginRight: "10px" },
    "& > .mantine-Text-root": { flex: 1 },
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
    marginTop: "30px",
  },

  noChatSelectedSVG: {
    width: "300px",
    marginBottom: "40px",
  },
}));
