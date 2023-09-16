import {
  Avatar,
  Flex,
  Box,
  Text,
  Divider,
  useMantineTheme,
  Loader,
  ScrollArea,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Messages from "./Messages/Messages";
import SendMessage from "../SendMessage";
import { fetchConversationMessages } from "../../../features/chat/chatSlice";

const ChatBox = (props) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const { conversationMessages, conversationMessagesLoading, fetchConversationMessagesSuccess } =
    useSelector((state) => state.chat);

  // Fetch current conversation messages
  useEffect(() => {
    if (props.selectedConversation) {
      dispatch(fetchConversationMessages(props.selectedConversation._id));
    }
  }, [props.selectedConversation]);

  let renderMessages = <Loader />;

  if (conversationMessagesLoading) {
    renderMessages = <Loader />;
  } else if (!props.selectedConversation) {
    renderMessages = (
      <ScrollArea offsetScrollbars sx={{ height: "600px" }}>
        <Text weight={500} size="md" align="center" color="primary">
          Select a conversation
        </Text>
      </ScrollArea>
    );
  } else if (conversationMessages && fetchConversationMessagesSuccess) {
    const friendInfo = props.selectedConversation.members.find(
      (member) => member._id !== props.myProfile._id
    );
    renderMessages = (
      <div>
        <Flex gap={10} align="center" p="xs">
          <Avatar
            component={Link}
            to={`/user-profile/${friendInfo._id}`}
            sx={{ cursor: "pointer" }}
            radius="xl"
            size="md"
            src={import.meta.env.VITE_BASE_IMAGE_URL + friendInfo.photo}
          />
          <Box>
            <Text
              component={Link}
              to={`/user-profile/${friendInfo._id}`}
              sx={{ cursor: "pointer" }}
              color="primary"
            >
              {friendInfo.name}
            </Text>
            <Text size="xs" color="dimmed">
              {friendInfo.email}
            </Text>
          </Box>
        </Flex>
        <Divider />
        <Flex direction="column" justify="space-between">
          <Messages
            myProfile={props.myProfile}
            conversationMessages={conversationMessages}
            selectedConversation={props.selectedConversation}
          />

          <SendMessage
            selectedConversation={props.selectedConversation}
            socket={props.socket}
            myProfile={props.myProfile}
            conversations={props.conversations}
          />
        </Flex>
      </div>
    );
  }

  return (
    <Box py={10} mt={2}>
      {renderMessages}
    </Box>
  );
};

export default ChatBox;
