import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Button, Container, Title, Card, TextInput } from "@mantine/core";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";
import { useSelector, useDispatch } from "react-redux";

import AddGroupPhoto from "./AddGroupPhoto";
import { successNotification, errorNotification } from "../../utils/showNotification";
import { createGroup, createGroupReset } from "../../features/group/groupSlice";

const schema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Book title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Book description is required",
  }),
});

const AddGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createGroupError, createGroupSuccess, createGroupLoading, error } = useSelector(
    (state) => state.group
  );

  const [image, setImage] = useState(null);

  const form = useForm({
    validate: joiResolver(schema),
    initialValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (createGroupError) {
      errorNotification({
        title: "Error creating a group",
        message: error,
      });
    }

    if (createGroupSuccess) {
      successNotification({
        title: "Group created",
        message: "Successfully created a new group",
      });
      navigate("/groups");
    }
  }, [dispatch, createGroupError, createGroupSuccess]);

  useEffect(() => {
    return () => {
      dispatch(createGroupReset());
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
      let groupData = new FormData();
      Object.keys(form.values).forEach((value) => {
        groupData.append([value], form.values[value]);
      });
      if (image) {
        groupData.append("image", image[0]);
      }
      dispatch(createGroup(groupData));
    }
  };

  return (
    <Box mt={20}>
      <Container size="xs">
        <Card withBorder mx="auto" p={20}>
          <Title order={3} mb={16}>
            Create a new Group
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <TextInput
                label="Name"
                placeholder="Group name"
                {...form.getInputProps("title")}
                mb={12}
              />
              <TextInput
                label="Description"
                placeholder="Group description"
                {...form.getInputProps("description")}
                mb={12}
              />
              <AddGroupPhoto
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

export default AddGroup;
