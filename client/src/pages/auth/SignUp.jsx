import { yupResolver } from '@hookform/resolvers/yup';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Image,
  Text,
  TextInput,
} from '@mantine/core';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Camera } from 'tabler-icons-react';
import * as yup from 'yup';

import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../axios';

import { GoogleButton, PasswordField } from '../../components';

const validationSchema = yup.object().shape({
  picture: yup.mixed().required('Image is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email address is required'),
  password: yup.string().required('Password is required'),
});

function SignUp() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  function handleChangeImage(e) {
    const imgSrc = e.target.files[0];
    setFile(e.target.files[0]);
    setValue('picture', imgSrc);
  }

  const mutation = useMutation((user) => axiosInstance.post('/api/auth/signup', user));
  function onSubmit(user) {
    const username = `${user.firstName} ${user.lastName}`;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('picture', user.picture);
    mutation.mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center mb="lg">
        <div aria-hidden="true" onClick={() => fileInputRef.current?.click()}>
          <input
            ref={fileInputRef}
            type="file"
            name="picture"
            accept="image/*"
            hidden
            onChange={handleChangeImage}
          />
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              height={110}
              width={110}
              radius={110}
              sx={{
                cursor: 'pointer',
                '&:active': {
                  transform: 'translateY(1px)',
                },
              }}
            />
          ) : (
            <ActionIcon size={110} radius={100} variant="light" aria-label="upload photo">
              <Camera size={45} />
            </ActionIcon>
          )}
        </div>
      </Center>
      <Group position="apart" grow mb="md">
        <TextInput
          label="First Name"
          name="firstName"
          type="text"
          {...register('firstName')}
          error={errors.firstName && errors.firstName.message}
        />
        <TextInput
          label="Last Name"
          name="lastName"
          {...register('lastName')}
          error={errors.lastName && errors.lastName.message}
        />
      </Group>
      <TextInput
        label="Email address"
        name="email"
        type="email"
        mb="md"
        error={errors.email && errors.email.message}
        {...register('email')}
      />

      <PasswordField
        name="password"
        label="Password"
        withStrength
        error={errors.password && errors.password.message}
        {...register('password')}
      />

      <Button fullWidth mt="md" type="submit" loading={mutation.isLoading}>
        Sign up
      </Button>

      <Divider label="OR" labelPosition="center" mt="lg" />
      <GoogleButton fullWidth mt="lg" />
      <Text mt="lg" align="center" size="sm">
        Already have an account ?{' '}
        <Box component={Link} color="blue" to="/auth/signin">
          Sign in
        </Box>
      </Text>
    </form>
  );
}

export default SignUp;
