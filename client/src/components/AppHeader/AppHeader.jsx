import {
  ActionIcon,
  Burger,
  MediaQuery,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconBell, IconMoonStars, IconSun } from '@tabler/icons';
import React, { useState } from 'react';
import { ChatifyLogo } from '../ChatifyLogo/ChatifyLogo';
import useStyles from './AppHeader.styles';

export const AppHeader = ({ navOpened }) => {
  /**
   * Mantine states
   */
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { classes } = useStyles();

  //   switch burger icon & cross when clicking on humburger icon
  const handleIconSwitch = () => {
    navOpened((o) => !o);
    setOpened((o) => !o);
  };

  return (
    <div className={classes.appHeaderWrapper}>
      <MediaQuery largerThan="md" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => handleIconSwitch()}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery>

      <ChatifyLogo type="full" />

      <div className={classes.appHeaderRightIcons}>
        <ActionIcon variant="transparent" title="Notifications">
          <IconBell />
        </ActionIcon>

        <ActionIcon
          variant="transparent"
          onClick={() => toggleColorScheme()}
          title="Toggle theme"
          style={{ marginLeft: '10px' }}
        >
          {dark ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
      </div>
    </div>
  );
};
