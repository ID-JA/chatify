import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { PasswordField } from '../../components';

const validationSchema = yup.object({
  newPassword: yup.string().required('No password provided.'),
});

function ResetPassword() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text size="lg" weight={500} align="center" mb="xl">
        Reset password
      </Text>
      <Text color="dimmed" size={14} mb="lg">
        Your new password must be different from previous used password.
      </Text>
      <PasswordField
        label="New password"
        name="newPassword"
        withStrength
        error={errors.newPassword && errors.newPassword.message}
        {...register('newPassword')}
      />
      <Button fullWidth mt="lg" type="submit">
        Change Password
      </Button>
    </form>
  );
}

export default ResetPassword;
