import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  Group,
  Notification,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { signin } from '../../redux/userSlice';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email address is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.bool(),
});

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(null);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (user) => {
    dispatch(signin(user))
      .then(unwrapResult)
      .then((res) => {
        // store token in LS
        if (localStorage.getItem('jwt')) localStorage.removeItem('jwt');
        localStorage.setItem('jwt', res.accessToken);
        navigate('/messenger');
      })
      .catch((e) => setApiError(e));
  };

  return (
    <>
      {apiError && (
        <Notification mb={20} color={apiError.color} onClose={() => setApiError(null)}>
          {apiError.message}
        </Notification>
      )}
      <Text size="lg" weight={500} align="center" mb="xl">
        Sign in
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="email"
          name="email"
          label="Email address"
          type="email"
          mb="lg"
          withAsterisk
          error={errors.email && errors.email.message}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          withAsterisk
          error={errors.email && errors.email.message}
          {...register('password')}
        />

        <Group position="apart" my="xl">
          <Checkbox label="Remember me" name="rememberMe" {...register('rememberMe')} />
          <Text component={Link} size="sm" color="blue" to="/auth/forget-password">
            Forgot password
          </Text>
        </Group>
        <Button type="submit" fullWidth>
          Sign in
        </Button>
        <Text mt="lg" align="center" size="sm">
          Don&apos;t have an account? <Link to="/auth/signup">Sign up</Link>
        </Text>
      </form>
    </>
  );
}

export default SignIn;
