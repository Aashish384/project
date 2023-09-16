import { Modal, Flex, Card, Text, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

const ReportsListModal = (props) => {
  return (
    <Modal
      radius="xs"
      title="Reporters"
      size="xs"
      opened={props.opened}
      centered
      onClose={() => props.setOpened(false)}
    >
      {props.users &&
        props.users.map((user) => (
          <Card
            radius="xs"
            key={user.reporter._id}
            withBorder
            sx={{ width: "100%" }}
            mb={12}
            py="xs"
            component={Link}
            to={`/user-profile/${user.reporter._id}`}
          >
            <Flex justify="space-between" align="center">
              <Avatar radius="xl" src={import.meta.env.VITE_BASE_IMAGE_URL + user.reporter.photo} />
              <Text>{user.reporter.name}</Text>
            </Flex>
            {user.why && <Text size={"sm"}>Reason : {user.why}</Text>}
          </Card>
        ))}
    </Modal>
  );
};

export default ReportsListModal;
