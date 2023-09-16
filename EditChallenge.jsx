import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Button, Container, Loader, Title, Card, TextInput } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import { useSelector, useDispatch } from "react-redux";

import EditChallengeImage from "./EditChallengeImage";
import { createChallenge, createChallengeReset } from "../../features/challenge/challengeSlice";
import { successNotification, errorNotification } from "../../utils/showNotification";
import axiosInstance from "../../utils/axiosInstance";

const schema = Joi.object({
  _id: Joi.any().optional(),
  title: Joi.string().required().messages({
    "string.empty": "Book title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Book description is required",
  }),
});

const EditChallenge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [challengeLoading, setChallengeLoading] = useState(true);
  const [prevImages, setPrevImages] = useState();

  const [image, setImage] = useState(null);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      _id: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axiosInstance.get(`/challenge/${params.challengeId}`);
        form.setValues({
          _id: response.data.challenge._id,
          title: response.data.challenge.title,
          description: response.data.challenge.description,
        });
        setPrevImages(response.data.challenge.image);
        setChallengeLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChallenge();
  }, []);

  const onImageDrop = (uploadedImage) => {
    setImage(uploadedImage);
  };

  const onImageReject = (a) => {
    console.log("File rejected");
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(errors);
    if (!hasErrors) {
      let challengeData = new FormData();
      Object.keys(form.values).forEach((value) => {
        challengeData.append([value], form.values[value]);
      });
      if (image) {
        challengeData.append("image", image[0]);
      }

      try {
        await axiosInstance.patch("/challenge/edit", challengeData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        navigate("/challenges", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box mt={20}>
      <Container size="xs">
        {challengeLoading ? (
          <Loader />
        ) : (
          <Card withBorder mx="auto" p={20}>
            <Title order={3} mb={16}>
              Edit a challenge
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
                <EditChallengeImage
                  image={image}
                  onImageDrop={onImageDrop}
                  onImageReject={onImageReject}
                  prevImages={prevImages}
                />
                <Button mt={30} fullWidth type="submit">
                  Edit
                </Button>
              </Flex>
            </form>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default EditChallenge;
