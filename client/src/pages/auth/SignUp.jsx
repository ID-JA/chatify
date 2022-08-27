import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActionIcon,
  Button,
  Center,
  createStyles,
  Divider,
  Group,
  Image,
  keyframes,
  TextInput,
} from "@mantine/core";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Camera } from "tabler-icons-react";
import * as yup from "yup";

import { GoogleButton } from "../../components";

const validationSchema = yup.object().shape({
  picture: yup.mixed().required("Image is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("Password is required"),
});

const bounce = keyframes({
  "0%": {
    transform: "translate(30px);",
  },
  "20%": {
    transform: "translate(-30px);",
  },
  "40%": {
    transform: "translate(15px);",
  },
  "60%": {
    transform: "translate(-15px);",
  },
  "80%": {
    transform: "translate(8px);",
  },
  "100%": {
    transform: "translate(0px);",
  },
});

const useStyles = createStyles((theme, _params, getRef) => ({
  imageWrapper: {
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      [`& .${getRef("overly")}`]: {
        transform: "translateY(0)",
      },
    },
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: theme.radius.md,
    cursor: "pointer",
  },

  overly: {
    ref: getRef("overly"),
    position: "absolute",
    top: 0,
    left: 0,
    height: 130,
    width: 130,
    borderRadius: theme.radius.md,
    backgroundColor: theme.fn.variant({ variant: "light", color: "blue" }).background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translateY(100%)",
    transition: "transform .2s linear",
    cursor: "pointer",
  },

  uploadButton: {
    animation: `${bounce} 0.4s 1 linear;`,
  },
}));

function SignUp() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { classes, cx } = useStyles();
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
    setValue("picture", imgSrc);
  }

  function onSubmit(e) {
    console.log(e);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center mb="xl">
        <div onClick={() => fileInputRef.current?.click()}>
          <input
            ref={fileInputRef}
            type="file"
            name="picture"
            accept="image/*"
            hidden
            onChange={handleChangeImage}
          />
          {file ? (
            <Image src={URL.createObjectURL(file)} radius="md" height={130} width={130} />
          ) : (
            <ActionIcon
              size={130}
              radius="md"
              variant="light"
              color={errors.picture ? "red" : "blue"}
              aria-label="upload photo"
            >
              <Camera size={45} />
            </ActionIcon>
          )}
        </div>
        {/* {errors.picture && errors.picture.message} */}
      </Center>
      <Group position="apart" mb="md">
        <TextInput
          label="First Name"
          name="firstName"
          type="text"
          {...register("firstName")}
          error={errors.firstName && errors.firstName.message}
        />
        <TextInput
          label="Last Name"
          name="lastName"
          {...register("lastName")}
          error={errors.lastName && errors.lastName.message}
        />
      </Group>
      <TextInput
        label="Email address"
        name="email"
        type="email"
        mb="md"
        error={errors.email && errors.email.message}
        {...register("email")}
      />
      <TextInput
        label="Email address"
        name="password"
        type="password"
        mb="md"
        error={errors.password && errors.password.message}
        {...register("password")}
      />

      <Button fullWidth mt="lg" type="submit">
        Sign up
      </Button>
      <Divider label="OR" labelPosition="center" mt="lg" />
      <Group position="center" mt="lg">
        <GoogleButton fullWidth />
      </Group>
    </form>
  );
}

export default SignUp;
