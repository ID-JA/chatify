import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: ' center',
    height: 'calc(100vh - 68px)',
  },
  avatar: {
    borderRadius: '50%',
    margin: '0 auto 20px',
  },
  usernameEmail: {
    flex: 1,
    textAlign: 'center',
  },
  //   how to access my custom color palette?
  logoutButton: {
    color: 'red',
    fontSize: '18px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
}));
