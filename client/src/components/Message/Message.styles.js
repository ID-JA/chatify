import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  message: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },

  ownMessage: {
    justifyContent: 'flex-end',
  },

  messageText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: '10px',
    maxWidth: '400px',
    borderRadius: '11px',
    padding: '10px',
    marginLeft: '5px',
  },

  ownBgColor: {
    backgroundColor: 'dodgerblue',
  },

  notOwnBgColor: {
    backgroundColor: '#3c4043 !important',
  },
}));
