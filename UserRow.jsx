import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Group, Text, Badge, ActionIcon, Button } from "@mantine/core";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import RoleChangeModal from "./RoleChangeModal";
import { changeUserRole } from "../../../features/user/userSlice";
import ReportsListModal from "./ReportsListModal";

const UserRow = (props) => {
  const [opened, setOpened] = useState(false);
  const [reportsOpened, setReportsOpened] = useState(false);
  const [roleValue, setRoleValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const dispatch = useDispatch();
  const { changeRoleLoading, changeRoleSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    setRoleValue(props.user.role);
    setStatusValue(props.user.enabled ? "enabled" : "disabled");
  }, [props.user]);

  const changeRoleHandler = () => {
    dispatch(
      changeUserRole({
        userId: props.user._id,
        newRole: roleValue,
        newStatus: statusValue,
      })
    );
  };

  useEffect(() => {
    if (changeRoleSuccess) {
      setOpened(false);
    }
  }, [changeRoleSuccess, changeRoleLoading]);

  return (
    <tr style={{ textAlign: "center" }}>
      <td>
        <Group>
          <Avatar
            radius="xs"
            component={Link}
            to={`/profile/${props.user.username}`}
            src={import.meta.env.VITE_BASE_IMAGE_URL + props.user.photo}
          />
          <Text component={Link} to={`/user-profile/${props.user._id}`}>
            {props.user.name}
          </Text>
        </Group>
      </td>
      <td>
        <Text>{props.user.username}</Text>
      </td>
      <td>
        <Badge radius="xs">{props.user.role}</Badge>
      </td>
      <td>
        <Text>{props.user.email}</Text>
      </td>
      <td>
        <Button radius="xs" size="xs" variant="outline" onClick={() => setReportsOpened(true)}>
          {props.user.reports?.length} time{props.user.reports?.length > 1 ? "s" : ""}
        </Button>
      </td>
      <td>
        <Badge color={props.user.enabled ? "green" : "red"}>
          {props.user.enabled ? "Enabled" : "Disabled"}
        </Badge>
      </td>
      <td>
        <Group position="right">
          <ActionIcon radius="xs" color="primary" variant="light" onClick={() => setOpened(true)}>
            <IoSwapVerticalOutline size={16} />
          </ActionIcon>
        </Group>
      </td>
      <ReportsListModal
        users={props.user.reports}
        opened={reportsOpened}
        setOpened={setReportsOpened}
      />
      <RoleChangeModal
        opened={opened}
        setOpened={setOpened}
        roleValue={roleValue}
        setRoleValue={setRoleValue}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
        changeRoleLoading={changeRoleLoading}
        changeRoleHandler={changeRoleHandler}
      />
    </tr>
  );
};

export default UserRow;
