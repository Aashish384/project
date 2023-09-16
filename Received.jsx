import { Avatar, Text, Box, Flex } from "@mantine/core";

import timeSince from "../../../utils/timeSince";

const Received = (props) => {
  return (
    <Flex justify="right" mb={12}>
      <Box mr={8}>
        {" "}
        <Box
          sx={(theme) => ({
            backgroundImage:
              theme.colorScheme === "dark"
                ? `linear-gradient(to right,${theme.colors.gray[7]},${theme.colors.gray[8]})`
                : `linear-gradient(to right,${theme.colors.gray[2]},${theme.colors.gray[4]})`,
            borderRadius: 2,
            fontSize: "90%",
          })}
          px={16}
          py={8}
        >
          {props.message.text}
        </Box>
        <Text size="xs" color="dimmed" sx={{ textAlign: "right" }}>
          {timeSince(new Date(props.message.createdAt)) + " ago"}
        </Text>
      </Box>
      <Avatar radius="xl" src={import.meta.env.VITE_BASE_IMAGE_URL + props.message.sender.photo} />
    </Flex>
  );
};

export default Received;
