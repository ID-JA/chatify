import { yupResolver } from "@hookform/resolvers/yup";
import { Anchor, Button, Text, TextInput } from "@mantine/core";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(e) {
    console.log(e); // expect : {email;"some value"}
  }

  return (
    <>
      <Text size="lg" weight={500} align="center" mb="xl">
        Forget password
      </Text>
      <Text color="dimmed" size={14} mb="xl">
        Enter your email address and your password will be reset and emailed to
        you.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Enter your email"
          label="Email address"
          name="email"
          mb="lg"
          error={errors.email && errors.email.message}
          {...register("email")}
        />
        <Button fullWidth mt="xl" type="submit">
          Reset password
        </Button>
      </form>
      <Text
        size={14}
        align="center"
        mt="lg"
        component={Link}
        to="/auth/signin"
        sx={{ display: "block" }}
      >
        Remember it, <Anchor color="blue">send me back</Anchor> to sing in
        screen
      </Text>
    </>
  );
};

export default ForgetPassword;
