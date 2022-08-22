import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  ChatHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    padding: "0.5rem",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    position: "fixed",
    width: "100%",
    maxWidth: "100%",
  },

  chatHeaderUserInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    marginLeft: "10px",
  },
}));
