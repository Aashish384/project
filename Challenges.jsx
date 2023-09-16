import { Box, Container, Button, Loader, Flex, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Challenge from "./Challenge";
import { fetchChallenges } from "../../features/challenge/challengeSlice";
import { errorNotification } from "../../utils/showNotification";

const Challenges = () => {
  const dispatch = useDispatch();

  const { error, isError, isSuccess, challenges, fetchChallengesLoading } = useSelector(
    (state) => state.challenge
  );

  const { user } = useSelector((state) => state.user);
  const { myProfile, myProfileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchChallenges());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Challenge error", message: error });
    }
  }, [dispatch, isError, isSuccess, challenges]);

  let renderChallenges = <Loader />;

  if (fetchChallengesLoading || myProfileLoading) {
    renderChallenges = <Loader />;
  } else if (challenges && isSuccess && !myProfileLoading) {
    renderChallenges = (
      <Container size="sm">
        <Flex justify="space-between">
          <Title order={3} mb={16}>
            Challenges
          </Title>
          {myProfile.role === "expert" ||
            (myProfile.role === "admin" && (
              <Button radius="xs" component={Link} to="/add-challenge">
                Create new Challenge
              </Button>
            ))}
        </Flex>

        <Flex direction="column">
          {challenges.map((challenge) => (
            <Challenge key={challenge._id} challenge={challenge} user={user} />
          ))}
        </Flex>
      </Container>
    );
  }

  return <Box>{renderChallenges}</Box>;
};

export default Challenges;
