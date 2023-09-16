import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Card,
  Container,
  Title,
  Select,
  Box,
  Flex,
} from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { loginUser, reset } from "../../features/user/userSlice";
import { getMyProfile } from "../../features/profile/profileSlice";
import isEmpty from "../../utils/isEmpty";
import { errorNotification } from "../../utils/showNotification";

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
  username: Joi.string().required().messages({
    "string.empty": "Username or email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
  role: Joi.string().required().messages({
    "string.empty": "Role is required",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const { error, userLoading, user, isError, isSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    // Check for login error
    if (isError) {
      if (typeof error === "string") {
        errorNotification({ title: "Login Error", message: error });
      } else if (typeof error === "object") {
        form.setErrors({
          username: error.username,
          password: error.password,
        });
      }
    }

    // Check for successful login
    if (isSuccess && !isEmpty(user)) {
      // successNotification({
      //   title: "Login successful",
      //   message: "Logged in succesfully",
      // });

      dispatch(getMyProfile());
      navigate("/explore", { replace: true });
    }

    dispatch(reset());
  }, [dispatch, isSuccess, isError, user, error]);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(loginUser(form.values));
    }
  };

  return (
    <Box mt={40}>
      <Container size="xs">
        <Card withBorder mx="auto" shadow="xl" p={26}>
          <Title order={4} mb={16}>
            Login to your account
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <TextInput
                label="Username or Email"
                placeholder="Your username or email"
                {...form.getInputProps("username")}
                mb={16}
              />
              <Select
                label="Role"
                placeholder="Your role"
                {...form.getInputProps("role")}
                mb={16}
                data={roles}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
            </Flex>
            <Button mt={30} fullWidth type="submit" loading={userLoading}>
              Login
            </Button>
            <Flex mt={4} align="center">
              <Text size="xs">Reset your password? </Text>
              <Button variant="subtle" size="xs" component={Link} to="/reset-password">
                Click here
              </Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
