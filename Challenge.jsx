import {
  Card,
  Title,
  Text,
  Badge,
  Flex,
  Button,
  Divider,
  Avatar,
  Image,
  Box,
  ActionIcon,
} from "@mantine/core";
import { FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Acceptors from "./Acceptors";
import { acceptChallenge } from "../../features/challenge/challengeSlice";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Challenge = ({ challenge, user }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const userRole = useSelector((state) => state.user.user.role);

  const isAccepted = challenge.acceptedBy.filter((el) => user.id === el.user._id);

  const deleteChallengeHandler = async (id) => {
    try {
      await axiosInstance.delete(`/challenge/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card withBorder shadow="md" mb={16} radius="xs">
      <Acceptors opened={opened} setOpened={setOpened} acceptors={challenge.acceptedBy || []} />
      <Flex justify="space-between" mb={10}>
        <Title order={4}>{challenge.title}</Title>
        <Box sx={{ textAlign: "right" }}>
          <Text color="dimmed">{new Date(challenge.createdAt).toDateString()}</Text>
          {userRole === "expert" && (
            <Flex>
              <Button
                radius={"xs"}
                variant="subtle"
                size="xs"
                ml="auto"
                component={Link}
                to={`/challenges/${challenge._id}/edit`}
              >
                Edit
              </Button>
              <Button
                radius={"xs"}
                variant="subtle"
                size="xs"
                ml="auto"
                color="red"
                onClick={() => deleteChallengeHandler(challenge._id)}
              >
                Delete
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>

      <Text>{challenge.description}</Text>
      {challenge.image && (
        <Image
          my={12}
          height={300}
          width={450}
          radius="xs"
          sx={{ margin: "auto" }}
          src={import.meta.env.VITE_BASE_IMAGE_URL + challenge.image}
        />
      )}

      <Divider my={12} />
      <Flex gap={12} align="center">
        {challenge.acceptedBy?.length > 0 &&
          challenge.acceptedBy
            .slice(0, 2)
            .map((el) => (
              <Avatar
                key={el._id}
                radius="xl"
                size="lg"
                src={import.meta.env.VITE_BASE_IMAGE_URL + el.user.photo}
              />
            ))}

        <Badge variant="dot" radius="xs" size="lg">
          {challenge.acceptedBy.length} Acceptor{challenge.acceptedBy.length === 1 ? "" : "s"}
        </Badge>
        <Button variant="outline" radius="xs" onClick={() => setOpened(true)}>
          View All
        </Button>
        {isAccepted.length > 0 ? (
          <Button radius="xs" ml="auto" leftIcon={<FiCheck size={18} />} color="green">
            Accepted
          </Button>
        ) : (
          <Button
            radius="xs"
            ml="auto"
            leftIcon={<FiCheck size={18} />}
            onClick={() => dispatch(acceptChallenge({ challengeId: challenge._id }))}
          >
            Accept
          </Button>
        )}
      </Flex>
    </Card>
  );
};

export default Challenge;
