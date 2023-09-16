import { Card, Loader, Container, Text, Button, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const ManageChallenges = (props) => {
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axiosInstance.get("/challenge");
        setChallenges(response.data.challenges);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChallenges();
  }, []);

  const deleteChallengeHandler = async (id) => {
    try {
      await axiosInstance.delete(`/challenge/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card withBorder shadow="md" mt={10} radius="xs">
      {!challenges ? (
        <Loader />
      ) : (
        <Container size="sm">
          {challenges.map((challenge) => (
            <Card withBorder key={challenge._id} mb={12}>
              <Flex align={"center"} justify={"space-between"}>
                <Text weight={600} color="primary">
                  {challenge.title}
                </Text>
                <Button
                  size="xs"
                  radius={"xs"}
                  color="red"
                  onClick={() => deleteChallengeHandler(challenge._id)}
                >
                  Delete
                </Button>
              </Flex>
              <Text size={"sm"}>{challenge.description}</Text>
              <Text>Acceptors Count : {challenge.acceptedBy?.length}</Text>
            </Card>
          ))}
        </Container>
      )}
    </Card>
  );
};

export default ManageChallenges;
