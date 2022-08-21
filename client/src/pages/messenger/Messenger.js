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
  createStyles,
} from "@mantine/core";
import { ChatifyLogo } from "../../components/ChatifyLogo/ChatifyLogo.jsx";
import Chat from "../../components/Chat/Chat.jsx";
import { IconSun, IconMoonStars } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  mainArea: {
    // padding: "-16px -16px 0 -16px !important",
    // height: "calc(100vh - 122px)",
    // maxHeight: "calc(100vh - 122px)",
    // backgroundColor: "red",
    // overflowY: "auto",
  },
}));

export default function Messenger() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();

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
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <ChatifyLogo type="full" />
            </div>

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
        <Navbar height="100vh" p="xs" width={{ base: 300 }} hidden={!opened}>
          <Navbar.Section grow mt="md">
            {" "}
            Links sections{" "}
          </Navbar.Section>
        </Navbar>
      }
    >
      <div>
        <Chat />
      </div>
    </AppShell>
  );
}
