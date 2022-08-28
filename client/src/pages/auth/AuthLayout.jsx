import { Container, createStyles, Paper } from '@mantine/core';
import { Outlet } from 'react-router-dom';

// TODO: move styles to separate file
const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: theme.colorScheme === 'dark' ? '#1e1e1e' : '#F1F3F5',
		alignItems: 'center',
	},
	inner: { minWidth: '30rem' },
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
				{/* <div className={classes.logo}>
					<ChatifyLogo />
				</div> */}
				<Paper p='lg'>
					<Outlet />
				</Paper>
			</Container>
		</div>
	);
}
