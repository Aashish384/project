import { Avatar, Text, Box, Flex } from "@mantine/core";

import timeSince from "../../../utils/timeSince";

const Sent = (props) => {
  return (
    <Flex mb={12}>
      <Avatar radius="xl" src={import.meta.env.VITE_BASE_IMAGE_URL + props.message.sender.photo} />
      <Box ml={8}>
        <Box
          sx={(theme) => ({
            backgroundImage: `linear-gradient(to right,${theme.colors.primary[6]},${theme.colors.primary[4]})`,
            borderRadius: 2,
            color: "white",
            fontSize: "90%",
            maxWidth: 400,
          })}
          px={16}
          py={8}
        >
          {props.message.text}
        </Box>
        <Text size="xs" color="dimmed">
          {timeSince(new Date(props.message.createdAt)) + " ago"}
        </Text>
      </Box>
    </Flex>
  );
};

export default Sent;
