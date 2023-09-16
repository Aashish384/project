import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader, PasswordInput, Button, Flex, Card, Title } from "@mantine/core";
import Joi from "joi";
import { joiResolver, useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";

import { checkResetValidity, createNewPassword } from "../../../features/user/userSlice";

const schema = Joi.object({
  password: Joi.string().required().min(4).messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least 4 characters",
  }),
  confirmPassword: Joi.string().required().min(4).messages({
    "string.empty": "Confirm password is required",
    "string.min": "Password should have at least 4 characters",
  }),
});

const NewPassword = (props) => {
  const dispatch = useDispatch();
  const { checkResetValidityLoading, createNewPasswordLoading } = useSelector(
    (state) => state.user
  );
  const params = useParams();
  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    dispatch(checkResetValidity(params.passwordResetString));
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      if (form.values.password !== form.values.confirmPassword) {
        form.setFieldError("confirmPassword", "Passwords are not equal");
      } else {
        dispatch(
          createNewPassword({ resetString: params.passwordResetString, formData: form.values })
        );
      }
    }
  };

  let renderNewPasswordForm = <Loader />;

  if (props.checkResetValidityLoading) {
    renderNewPasswordForm = <Loader />;
  } else {
    renderNewPasswordForm = (
      <form onSubmit={formSubmitHandler}>
        <Title order={4} mb={14}>
          Create a new password
        </Title>
        <Flex direction="column" grow>
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password}
            mb={16}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            value={form.values.confirmPassword}
            onChange={(event) => form.setFieldValue("confirmPassword", event.currentTarget.value)}
            error={form.errors.confirmPassword}
          />

          <Button mt={30} type="submit" loading={createNewPasswordLoading}>
            Change Password
          </Button>
        </Flex>
      </form>
    );
  }

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
      {renderNewPasswordForm}
    </Card>
  );
};

export default NewPassword;
