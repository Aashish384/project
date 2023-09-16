import { Box, Title, Card, Text, Button, Flex, Avatar, Container, Anchor } from "@mantine/core";
import React from "react";
import { useDispatch } from "react-redux";

import { acceptExpertApplication, rejectExpertApplication } from "../../../features/user/userSlice";

export default function ExpertApplication(props) {
  const dispatch = useDispatch();

  return (
    <Card withBorder mb={20}>
      <Flex gap={16} align="center">
        <Avatar
          radius="xl"
          src={import.meta.env.VITE_BASE_IMAGE_URL + props.application.appliedBy.photo}
        />
        <Box>
          <Text weight={500}>{props.application.appliedBy.name}</Text>
          <Text size="sm">{props.application.appliedBy.email}</Text>
        </Box>
        <Button
          radius="xs"
          ml="auto"
          onClick={() => dispatch(acceptExpertApplication(props.application._id))}
        >
          Accept
        </Button>
        <Button
          radius="xs"
          color="red"
          onClick={() => dispatch(rejectExpertApplication(props.application._id))}
        >
          Reject
        </Button>
      </Flex>
      <Text size="lg" mt={20}>
        Message: {props.application.message}
      </Text>
      <Text weight={800} mt={20}>
        Attached Files
      </Text>
      {props.application.files &&
        props.application.files.map((file) => (
          <Anchor
            key={file._id}
            href={import.meta.env.VITE_BASE_IMAGE_URL + file.url}
            sx={{ display: "flex" }}
          >
            {file.url}
          </Anchor>
        ))}
    </Card>
  );
}
