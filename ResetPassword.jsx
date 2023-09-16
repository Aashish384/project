import { TextInput, Button, Flex, Text, Card, Title } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { resetPassword } from "../../../features/user/userSlice";

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
});

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const { resetPasswordLoading } = useSelector((state) => state.user);

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      email: "",
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      dispatch(resetPassword(form.values));
    }
  };

  return (
    <Card
      mt={30}
      withBorder
      mx="auto"
      p={26}
      sx={{
        maxWidth: 600,
      }}
    >
      <form onSubmit={formSubmitHandler}>
        <Title order={4} mb={14}>
          Reset your password
        </Title>
        <Flex direction="column" grow>
          <TextInput
            label="Email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email}
          />
          <Text size="sm" mt={12}>
            If this email belongs to you, you will get a password reset link in your email
          </Text>
          <Button mt={30} type="submit" loading={resetPasswordLoading}>
            Send Link
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

export default ResetPassword;
