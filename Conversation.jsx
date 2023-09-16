import { Card, Avatar, Text, Box, Flex } from "@mantine/core";

const Conversation = (props) => {
  const friendInfo = props.conversation.members.find(
    (member) => member._id !== props.myProfile._id
  );

  if (friendInfo.enabled == false) return null;

  return (
    <Card
      radius="xs"
      mb={12}
      px="xs"
      py="sm"
      sx={(theme) => ({
        // backgroundColor: theme.colors.gray[9],
        backgroundColor:
          props.conversation._id === props.selectedConversation?._id
            ? theme.colorScheme === "dark"
              ? theme.colors.gray[8]
              : "#FFFFFF"
            : theme.colorScheme === "dark"
            ? theme.colors.gray[9]
            : theme.colors.gray[2],
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[8] : "#FFFFFF",
        },
      })}
      onClick={() => props.setSelectedConversation(props.conversation)}
    >
      <Flex gap={8} justify="space-between" align="center">
        <Avatar
          radius="xl"
          size="md"
          src={import.meta.env.VITE_BASE_IMAGE_URL + friendInfo.photo}
        />
        <Box>
          <Text color="primary" size="sm">
            {friendInfo.name}
          </Text>
          <Text size="xs" color="dimmed">
            {friendInfo.email}
          </Text>
        </Box>
        <Text size="xs" color="dimmed"></Text>
      </Flex>
    </Card>
  );
};

export default Conversation;
