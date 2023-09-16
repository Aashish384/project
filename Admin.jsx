import { useState } from "react";
import { Tabs, Card, Title, Container } from "@mantine/core";

import ManageUsers from "./ManageUsers/ManageUsers";
import ManageExpertApplications from "./ManageExpertApplications/ManageExpertApplications";
import ManageGroups from "./ManageGroups/ManageGroups";
import ManageChallenges from "./ManageChallenges/ManageChallenges";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Container size="lg">
      <Card sx={{ overflowX: "scroll" }} radius="xs">
        <Title order={4}>Admin Panel</Title>
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          sx={{ overflowX: "scroll", minWidth: 850 }}
        >
          <Tabs.List>
            <Tabs.Tab value="users">Users</Tabs.Tab>
            <Tabs.Tab value="expert-applications">Expert Applications</Tabs.Tab>
            <Tabs.Tab value="groups">Groups</Tabs.Tab>
            <Tabs.Tab value="challenges">Challenges</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="users">
            <ManageUsers />
          </Tabs.Panel>
          <Tabs.Panel value="expert-applications">
            <ManageExpertApplications />
          </Tabs.Panel>
          <Tabs.Panel value="groups">
            <ManageGroups />
          </Tabs.Panel>
          <Tabs.Panel value="challenges">
            <ManageChallenges />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
};

export default Admin;
