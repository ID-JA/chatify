import { yupResolver } from "@hookform/resolvers/yup";
import {
  Anchor,
  Button,
  Container,
  createStyles,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ChatifyLogo } from "../../components";

const validationSchema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
});

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    maxWidth: "30rem",
  },
  paper: {
    backgroundColor: theme.colorScheme === "dark" ? "#1e1e1e" : "#FAFBFC",
  },

  logo: {
    marginBottom: theme.spacing.xl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 50,
    marginRight: 10,
  },
}));

const ForgetPassword = () => {
  const { classes } = useStyles();

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
    <div className={classes.wrapper}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <ChatifyLogo type="mark" />
        </div>
        <Paper withBorder p="lg" className={classes.paper}>
          <Text size="lg" weight={500} align="center" mb="xl">
            Forget password
          </Text>
          <Text color="dimmed" size={14} mb="xl">
            Enter your email address and your password will be reset and emailed
            to you.
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
        </Paper>
        <Text size={14} align="center" mt="lg">
          Remember it, <Anchor color="blue">send me back</Anchor> to sing in
          screen
        </Text>
      </Container>
    </div>
  );
};

export default ForgetPassword;
