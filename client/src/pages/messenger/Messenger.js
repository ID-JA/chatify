import { useCallback, useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { io } from "socket.io-client";
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
  Paper,
  Button,
  Loader,
} from "@mantine/core";
import { ChatifyLogo } from "../../components/ChatifyLogo/ChatifyLogo.jsx";
import OnlineFriend from "../../components/OnlineFriend/OnlineFriend.jsx";
import Chat from "../../components/Chat/Chat.jsx";
import { IconSun, IconMoonStars, IconBell } from "@tabler/icons";
import SideChat from "../../components/SideChat/SideChat.jsx";
import NoChatSelected from "../../assets/images/noChatSelected.svg";
import Profile from "../../components/Profile/Profile.jsx";

import useStyles from "./Messenger.styles.js";
import { useSelector } from "react-redux";

import axiosInstance from "../../axios";
import axios from "axios";
import { cancelTokenSource } from "../../axios";
import { useQuery } from "react-query";
import useFetch from "../../hooks/useFetch.js";
import { useRef } from "react";

export default function Messenger() {
  /**
   * Mantine states
   */
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  /**
   * Redux store states
   */
  const { username, picture, _id, friends, reqSent, reqRecieved } = useSelector(
    (store) => store.user.user
  );

  /**
   * Component core states
   */
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchedUsername, setSearchedUsername] = useState("");

  // Fetching all chats of current user
  const { data, isLoading, error } = useFetch(`/api/chats/${_id}`);

  const handleChangeUser = useCallback(
    (data) => {
      setSearchedUser((prev) => data);
    },
    [data]
  );

  // abort prev requests when searching for a user
  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/users?username=${searchedUsername}`,
          {
            signal: controller.signal,
          }
        );
        console.log(data);
        handleChangeUser(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (searchedUsername !== "") fetchUser();
    else setSearchedUser(null);

    return () => {
      controller.abort();
    };
  }, [searchedUsername]);

  // get the relationship of current user and searched user
  const setRelationshipStatus = useCallback(() => {
    if (searchedUsername !== "") {
      if (searchedUser?._id === _id) return "me";
      if (friends.includes(searchedUser?._id)) return "friend";
      if (reqSent.includes(searchedUser?._id)) return "sent";
      if (reqRecieved.includes(searchedUser?._id)) return "recieved";
      return "stranger";
    }
  }, [searchedUser]);

  /**
   * render the buttons (unfriend, add friend, cancel request)
   * based on the relationship between current user and searched user
   */
  const RenderRelationshipButtons = useCallback(() => {
    if (searchedUsername !== "") {
      const test = setRelationshipStatus(searchedUsername);
      switch (test) {
        case "me":
          return <></>;

        case "friend":
          return (
            <Button
              style={{ backgroundColor: "rgba(200, 0, 0, 0.5)", color: "#fff" }}
            >
              Unfriend
            </Button>
          );

        case "recieved":
          return (
            <>
              <Button style={{ backgroundColor: "green", color: "#fff" }}>
                Accept
              </Button>
              <Button
                style={{
                  backgroundColor: "rgba(200, 0, 0, 0.5)",
                  color: "#fff",
                }}
              >
                Refuse
              </Button>
            </>
          );

        case "sent":
          return <Button>Cancel request</Button>;

        default:
          return (
            <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}>
              Add friend
            </Button>
          );
      }
    }
  }, [searchedUsername]);

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

            <div style={{ display: "flex", alignItems: "center" }}>
              <ActionIcon variant="transparent" title="Notifications">
                <IconBell />
              </ActionIcon>

              <ActionIcon
                variant="transparent"
                onClick={() => toggleColorScheme()}
                title="Toggle theme"
                style={{ marginLeft: "10px" }}
              >
                {dark ? <IconSun /> : <IconMoonStars />}
              </ActionIcon>
            </div>
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
                    position="right"
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
                style={{ flex: 1, position: "relative" }}
                value={searchedUsername}
                onChange={(e) => setSearchedUsername(e.target.value)}
                autoComplete="false"
              />
              {/* search result */}
              {searchedUser && (
                <div>
                  <Paper
                    p={7}
                    withBorder
                    className={classes.inputBoxSearchResult}
                  >
                    <Avatar
                      src={searchedUser?.picture?.pictureURL}
                      size="md"
                      radius="xl"
                    />
                    <Text>{searchedUser?.username}</Text>

                    {/* action button(s) */}
                    <RenderRelationshipButtons />
                  </Paper>
                </div>
              )}
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
              {isLoading ? (
                <Loader
                  size="md"
                  style={{ display: "block", marginInline: "auto" }}
                />
              ) : (
                <div>
                  {data?.map((item) => (
                    <div onClick={() => setSelectedChat(item)} key={item._id}>
                      <SideChat conversation={item} currentUserID={_id} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Navbar.Section>
        </Navbar>
      }
    >
      <div>
        {!selectedChat ? (
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
        ) : (
          <Chat chat={selectedChat} />
        )}
      </div>
    </AppShell>
  );
}
