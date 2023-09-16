import { useEffect, useState, useRef } from "react";
import { Card, Grid, Box, Title, Loader, Container, Tabs } from "@mantine/core";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import Conversations from "./Conversations/Conversations";
import ChatBox from "./ChatBox/ChatBox";
import { fetchConversations, setArrivedMessage } from "../../features/chat/chatSlice";
import { successNotification, errorNotification } from "../../utils/showNotification";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { error, isError, conversations, isSuccess, fetchConversationsLoading } = useSelector(
    (state) => state.chat
  );
  const { myProfileLoading, myProfile } = useSelector((state) => state.profile);
  const [gotMessage, setGotMessage] = useState(null);
  const [selectedTab, setSelectedTab] = useState("messages");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    dispatch(fetchConversations());

    // Get a new message
    socket.current.on("getMessage", (data) => {
      setGotMessage({
        sender: data.senderInfo,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Show error when error occurs
  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Error", message: error });
    }
  }, [error, isError]);

  // when we get a new message, check if it is part of the current conversation
  useEffect(() => {
    let isMemberIndex = null;
    isMemberIndex =
      gotMessage &&
      selectedConversation?.members.findIndex((member) => member._id === gotMessage.sender._id);

    if (isMemberIndex >= 0 && isMemberIndex !== null) {
      dispatch(setArrivedMessage(gotMessage));
    }

    if (selectedConversation) {
      const friendInfo = selectedConversation.members.find(
        (member) => member._id !== myProfile._id
      );

      socket.current.emit("conversationSelected", friendInfo._id);
    }
  }, [gotMessage, selectedConversation]);

  // Add user on list when he connects
  useEffect(() => {
    if (myProfile) {
      socket.current.emit("addUser", myProfile?._id);
    }
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [myProfile]);

  let renderChat = <Loader />;

  if (fetchConversationsLoading || myProfileLoading) {
    renderChat = <Loader />;
  } else if (isSuccess && conversations) {
    renderChat = (
      <Grid columns={12}>
        <Grid.Col
          span={12}
          md={3}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[2],
          })}
        >
          <Conversations
            conversations={conversations}
            myProfile={myProfile}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onlineUsers={onlineUsers}
          />
        </Grid.Col>
        <Grid.Col span={12} md={9}>
          <ChatBox
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            socket={socket}
            myProfile={myProfile}
            conversations={conversations}
          />
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Box>
      <Container size="lg">
        <Card withBorder shadow="lg" p={0} radius="xs">
          {renderChat}
        </Card>
      </Container>
    </Box>
  );
};

export default Chat;
