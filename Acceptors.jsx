import { Modal, Flex, Card, Text, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

const Acceptors = (props) => {
  return (
    <Modal
      radius="xs"
      title="Challenge accepting users"
      size="xs"
      centered
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      {props.acceptors.map((acceptor) => {
        if (acceptor.user.enabled == true) {
          return (
            <Card
              radius="xs"
              key={acceptor._id}
              withBorder
              sx={{ width: "100%", cursor: "pointer" }}
              mb={12}
              py="xs"
              component={Link}
              to={`/user-profile/${acceptor.user._id}`}
            >
              <Flex justify="space-between" align="center">
                <Avatar
                  radius="xl"
                  src={import.meta.env.VITE_BASE_IMAGE_URL + acceptor.user.photo}
                />
                <Text>{acceptor.user.name}</Text>
              </Flex>
            </Card>
          );
        } else return null;
      })}
    </Modal>
  );
};

export default Acceptors;
