import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Container,
  Select,
  Title,
  Box,
  Flex,
} from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { createUser, reset, resetCreateUser } from "../../../features/user/userSlice";
import isEmpty from "../../../utils/isEmpty";
import { successNotification, errorNotification } from "../../../utils/showNotification";

const roles = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Expert",
    value: "expert",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

const schema = Joi.object({
  username: Joi.string().min(4).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username should have at least 4 letters",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Your name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 8 characters",
  }),
  role: Joi.string().required().messages({
    "string.empty": "Your role is required",
  }),
});

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, userLoading, user, isError, createUserLoading, createUserSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // Check for sign up error
    if (isError) {
      if (typeof error === "string") {
        errorNotification({ title: "User creation error", message: error });
      } else if (typeof error === "object") {
        form.setErrors({
          username: error?.username,
          name: error?.name,
          email: error?.email,
          password: error?.password,
          role: error?.role,
        });
      }
    }

    // Check for user creation success
    if (createUserSuccess && !isError) {
      successNotification({
        title: "User creation successful",
        message: `User created successfully`,
      });
      navigate("/admin");
    }

    dispatch(resetCreateUser());
  }, [dispatch, isError, error, createUserSuccess]);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(createUser(form.values));
    }
  };

  return (
    <Box mt={40}>
      <Container size="xs">
        <Card withBorder mx="auto" shadow="xl" p={26}>
          <Title order={4} mb={16}>
            Create a new User
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <TextInput
                label="Username"
                placeholder="Username"
                {...form.getInputProps("username")}
                mb={16}
              />

              <TextInput
                label="Fullname"
                placeholder="Name of the user"
                {...form.getInputProps("name")}
                mb={16}
              />
              <TextInput
                label="Email"
                placeholder="Email of the user"
                {...form.getInputProps("email")}
                mb={16}
              />
              <Select
                label="Role"
                placeholder="Role of the user"
                {...form.getInputProps("role")}
                mb={16}
                data={roles}
              />
              <PasswordInput
                label="Password"
                placeholder="Password of the user"
                {...form.getInputProps("password")}
              />
            </Flex>
            <Button mt={30} fullWidth type="submit" loading={userLoading}>
              Create
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default CreateUser;
