import { Global } from '@mantine/core';

export function MyGlobalStyle() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },

        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        },
      })}
    />
  );
}
