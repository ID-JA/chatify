import { Box, PasswordInput, Progress, Text } from '@mantine/core';

import propsTypes from 'prop-types';
import React, { useState } from 'react';
import { Check, X } from 'tabler-icons-react';

function PasswordRequirement({ meets, label }) {
	return (
		<Text
			color={meets ? 'teal' : 'red'}
			sx={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size='sm'>
			{meets ? <Check size={14} /> : <X size={14} />} <Box ml={10}>{label}</Box>
		</Text>
	);
}

const requirements = [
	{ re: /[0-9]/, label: 'Includes number' },
	{ re: /[a-z]/, label: 'Includes lowercase letter' },
	{ re: /[A-Z]/, label: 'Includes uppercase letter' },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
	let multiplier = password.length > 5 ? 0 : 1;
	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export const PasswordField = React.forwardRef(
	({ error, name, onChange, withStrength, label, ...props }, ref) => {
		const [password, setPassword] = useState('');
		function handleChange(event) {
			onChange(event);
			setPassword(event.target.value);
		}

		const checks = requirements.map((requirement, index) => (
			<PasswordRequirement
				key={index}
				label={requirement.label}
				meets={requirement.re.test(password)}
			/>
		));

		const strength = getStrength(password);
		const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

		return (
			<Box>
				<PasswordInput
					ref={ref}
					label={label}
					name={name}
					onChange={(e) => handleChange(e)}
					error={error}
					mb='md'
					{...props}
				/>
				{withStrength && (
					<>
						{strength === 10 || (
							<Progress
								color={color}
								value={strength}
								size={5}
								style={{ marginBottom: 10 }}
							/>
						)}
						{checks}
					</>
				)}
			</Box>
		);
	}
);

PasswordField.displayName = 'PasswordField';

PasswordField.defaultProps = {
	error: '',
	name: 'password',
	label: '',
	onChange: () => {},
	withStrength: false,
};

PasswordField.propTypes = {
	error: propsTypes.string,
	name: propsTypes.string,
	label: propsTypes.string,
	onChange: propsTypes.func,
	withStrength: propsTypes.bool,
};
