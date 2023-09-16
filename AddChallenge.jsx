import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Button, Container, Title, Card, TextInput } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import { useSelector, useDispatch } from "react-redux";

import AddChallengeImage from "./AddChallengeImages";
import { createChallenge, createChallengeReset } from "../../features/challenge/challengeSlice";
import { successNotification, errorNotification } from "../../utils/showNotification";

const schema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Book title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Book description is required",
  }),
});

const AddChallenge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createChallengeError, createChallengeSuccess, createChallengeLoading, error } =
    useSelector((state) => state.challenge);

  const [image, setImage] = useState(null);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (createChallengeError) {
      errorNotification({
        title: "Error creating a challenge",
        message: error,
      });
    }

    if (createChallengeSuccess) {
      successNotification({
        title: "Challenge created",
        message: "Successfully created a new challenge",
      });
      navigate("/challenges");
    }
  }, [dispatch, createChallengeError, createChallengeSuccess]);

  useEffect(() => {
    return () => {
      dispatch(createChallengeReset());
    };
  }, []);

  const onImageDrop = (uploadedImage) => {
    setImage(uploadedImage);
  };

  const onImageReject = (a) => {
    console.log("File rejected");
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      let challengeData = new FormData();
      Object.keys(form.values).forEach((value) => {
        challengeData.append([value], form.values[value]);
      });
      if (image) {
        challengeData.append("image", image[0]);
      }
      dispatch(createChallenge(challengeData));
    }
  };

  return (
    <Box mt={20}>
      <Container size="xs">
        <Card withBorder mx="auto" p={20}>
          <Title order={3} mb={16}>
            Add a new challenge
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <TextInput
                label="Title"
                placeholder="Challenge title"
                {...form.getInputProps("title")}
                mb={12}
              />
              <TextInput
                label="Description"
                placeholder="Challenge description"
                {...form.getInputProps("description")}
                mb={12}
              />
              <AddChallengeImage
                image={image}
                onImageDrop={onImageDrop}
                onImageReject={onImageReject}
              />
              <Button mt={30} fullWidth type="submit">
                Add
              </Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default AddChallenge;
