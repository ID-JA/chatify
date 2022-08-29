import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  mainContainer: {
    height: 'calc(100vh - 122px)',
    maxHeight: 'calc(100vh - 122px)',
    // overflowY: "auto",
    overflowX: 'hidden',
    // backgroundColor: "green",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    position: 'relative',
    boxSizing: 'border-box',
  },
  messagesBox: {
    marginTop: '59.39px',
    // marginBottom: "59.39px",
    paddingLeft: '10px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
      width: '6px',
    },

    '::-webkit-scrollbar-track': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
      borderRadius: '10px',
    },

    '::-webkit-scrollbar-thumb': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
      borderRadius: '10px',
    },
  },
  inputBox: {
    marginTop: '20px',
    marginBottom: '20px',
    width: '80%',
    marginInline: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));
