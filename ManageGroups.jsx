import { Card, Loader, Container, Text, Button, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const ManageGroups = (props) => {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get("/group");
        setGroups(response.data.groups);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGroups();
  }, []);

  const deleteGroupHandler = async (id) => {
    try {
      await axiosInstance.delete(`/group/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card withBorder shadow="md" mt={10} radius="xs">
      {!groups ? (
        <Loader />
      ) : (
        <Container size="sm">
          {groups.map((group) => (
            <Card withBorder key={group._id} mb={12}>
              <Flex align={"center"} justify={"space-between"}>
                <Text weight={600} color="primary">
                  {group.title}
                </Text>
                <Button
                  size="xs"
                  radius={"xs"}
                  color="red"
                  onClick={() => deleteGroupHandler(group._id)}
                >
                  Delete
                </Button>
              </Flex>
              <Text size={"sm"}>{group.description}</Text>
              <Text>Member Count : {group.members?.length}</Text>
            </Card>
          ))}
        </Container>
      )}
    </Card>
  );
};

export default ManageGroups;
