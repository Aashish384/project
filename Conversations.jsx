import { Card, Box, Avatar, Text, ScrollArea, Tabs, Button, Flex, TextInput } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";

import Conversation from "./Conversation";
import OnlineUsers from "../OnlineUsers/OnlineUsers";

const Conversations = (props) => {
  return (
    <Box>
      <Flex gap={10} align="center" mb={24} mt={2} p="xs">
        <Avatar
          radius="xl"
          size="lg"
          src={import.meta.env.VITE_BASE_IMAGE_URL + props.myProfile.photo}
        />
        <Box>
          <Text color="primary">{props.myProfile.name}</Text>
          <Text size="xs" color="dimmed">
            {props.myProfile.email}
          </Text>
        </Box>
      </Flex>
      <Box mb={24}>
        <TextInput mx={10} placeholder="Search" radius="xs" icon={<IoIosSearch size={20} />} />
      </Box>
      <Tabs variant="default" value={props.selectedTab} onTabChange={props.setSelectedTab}>
        <Tabs.List grow>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
          <Tabs.Tab value="users">Users</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="messages">
          {" "}
          <ScrollArea sx={{ height: "425px" }}>
            {props.conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                myProfile={props.myProfile}
                selectedConversation={props.selectedConversation}
                setSelectedConversation={props.setSelectedConversation}
              />
            ))}
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="users">
          <ScrollArea sx={{ height: "425px" }}>
            <OnlineUsers
              userInfo={props.myProfile}
              onlineUsers={props.onlineUsers}
              setSelectedConversation={props.setSelectedConversation}
            />
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Conversations;
