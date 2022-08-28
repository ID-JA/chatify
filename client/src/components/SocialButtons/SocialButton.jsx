import { Button } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';

export function SocialButton({ icon, color, ...others }) {
	return (
		<Button
			component='a'
			target='_blank'
			rel='noopener noreferrer'
			leftIcon={icon}
			styles={(theme) => ({
				root: {
					border: `1px solid ${color}`,
					paddingLeft: 20,
					paddingRight: 20,
					color: theme.colorScheme === 'dark' ? '#fff' : color,
					backgroundColor: theme.colorScheme === 'dark' ? '#333' : '#fff',
					'&:hover': {
						backgroundColor: theme.fn.darken(
							theme.colorScheme === 'dark' ? '#333' : '#fff',
							0.05
						),
					},
				},
				leftIcon: {
					marginRight: theme.spacing.md,
				},
			})}
			{...others}
		/>
	);
}

export function GoogleButton({ ...others }) {
	return (
		<SocialButton color='#4285f4' icon={<BrandGoogle />} {...others}>
			Sign in with Google
		</SocialButton>
	);
}
