import { useEffect } from "react";
import { Card, Table, Loader, Button, Flex } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import UserRow from "./UserRow";
import { getAllUsers } from "../../../features/user/userSlice";
import { Link } from "react-router-dom";

const ManageUsers = (props) => {
  const dispatch = useDispatch();
  const { users, fetchUsersLoading, fetchUsersSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let renderUserItems = <Loader />;
  if (fetchUsersLoading) {
    renderUserItems = <Loader />;
  } else if (users && fetchUsersSuccess) {
    renderUserItems = (
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr style={{ textAlign: "centerd" }}>
            <th style={{ textAlign: "left" }}>User</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Reported</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10} radius="xs">
      <Flex>
        <Button
          size="xs"
          variant="subtle"
          radius={"xs"}
          ml="auto"
          component={Link}
          to="/admin/create-user"
        >
          Create new User
        </Button>
      </Flex>

      {renderUserItems}
    </Card>
  );
};

export default ManageUsers;
