import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  ScrollArea,
  TextInput,
  Avatar,
  Drawer,
} from "@mantine/core";
import { ChatifyLogo } from "../../components/ChatifyLogo/ChatifyLogo.jsx";
import OnlineFriend from "../../components/OnlineFriend/OnlineFriend.jsx";
import Chat from "../../components/Chat/Chat.jsx";
import { IconSun, IconMoonStars } from "@tabler/icons";
import SideChat from "../../components/SideChat/SideChat.jsx";
import NoChatSelected from "../../assets/images/noChatSelected.svg";
import Profile from "../../components/Profile/Profile.jsx";

import useStyles from "./Messenger.styles.js";
import { useSelector } from "react-redux";

export default function Messenger() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const { classes } = useStyles();

  const { username, email, picture } = useSelector((store) => store.user.user);
  const [selectedChat, setSelectedChat] = useState(null);

  console.log(username, email, picture.pictureURL);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="md"
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <ChatifyLogo type="full" />

            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </div>
          {/* </div> */}
        </Header>
      }
      navbar={
        <Navbar
          p="xs"
          width={{
            // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
            sm: 300,

            // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
            lg: 400,

            // When other breakpoints do not match base width is used, defaults to 100%
            base: "70vw",
          }}
          hidden={!opened}
        >
          <Navbar.Section component={ScrollArea} grow mt="md">
            {/* Current user info */}
            <div className={classes.userInfo}>
              <Avatar
                src={picture.pictureURL}
                size="md"
                radius="xl"
                style={{ marginRight: "10px" }}
              />
              <div>
                <div>
                  <Text size={17}>{username}</Text>
                </div>
                <div>
                  <Text
                    size={12}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => setDrawerOpened(true)}
                  >
                    See profile
                  </Text>

                  {/* PROFILE DRAWER */}
                  <Drawer
                    opened={drawerOpened}
                    onClose={() => setDrawerOpened(false)}
                    title="Profile"
                    padding="xl"
                    size="lg"
                  >
                    <Profile />
                  </Drawer>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className={classes.inputBox}>
              <TextInput
                placeholder="Enter your message"
                style={{ flex: 1, marginRight: "7px" }}
              />
            </div>

            {/* Online Friends */}
            <div className={classes.onlineFriendsWrapper}>
              <Text style={{ marginBottom: "15px" }}>Online friends</Text>
              <div className={classes.onlineFriends}>
                {new Array(4).fill(0).map((_, index) => (
                  <OnlineFriend
                    key={index}
                    picture="https://images.unsplash.com/photo-1657299170222-1c67dc056b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    username="Alpha"
                  />
                ))}
              </div>
            </div>

            {/* Side chat */}
            <div className={classes.sideChatWrapper}>
              <Text style={{ marginBottom: "15px" }}>Conversations</Text>
              <div>
                {new Array(7).fill(0).map((_, index) => (
                  <SideChat
                    key={index}
                    picture="https://images.unsplash.com/photo-1657299170222-1c67dc056b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    username="Alpha"
                    lastMessage="this is the last message"
                    lastMessageTimestamp="1 hour ago"
                    totalMessagesNotSeen={2}
                  />
                ))}
              </div>
            </div>
          </Navbar.Section>
        </Navbar>
      }
    >
      <div>
        {/* {!selectedChat ? (
          <div className={classes.noChatSelectedWrapper}>
            <img
              className={classes.noChatSelectedSVG}
              src={NoChatSelected}
              alt="no chat selected"
            />
            <Text className={classes.noChatSelectedText}>
              Start a new Conversation with someone now and have fun!
            </Text>
          </div>
        ) : ( */}
        <Chat />
        {/* )} */}
      </div>
    </AppShell>
  );
}
