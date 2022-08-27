import { Container, createStyles, Paper } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { ChatifyLogo } from '../../components';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: { minWidth: '30rem' },
  paper: {
    backgroundColor: theme.colorScheme === 'dark' ? '#1e1e1e' : '#FAFBFC',
  },
  logo: {
    marginBottom: theme.spacing.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function AuthLayout() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <ChatifyLogo />
        </div>
        <Paper p="lg" withBorder>
          <Outlet />
        </Paper>
      </Container>
    </div>
  );
}
