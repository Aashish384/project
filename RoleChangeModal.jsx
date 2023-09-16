import { Modal, Button, Select, Text } from "@mantine/core";
const roles = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "expert",
    label: "Expert",
  },
];

const statuses = [
  {
    value: "enabled",
    label: "Enabled",
  },
  {
    value: "disabled",
    label: "Disabled",
  },
];

const RoleChangeModal = (props) => {
  return (
    <Modal
      radius="xs"
      centered
      title={<Text weight={600}>Change user role</Text>}
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      <Select
        radius="xs"
        data={roles}
        placeholder="Pick a role"
        label="Pick a new role"
        value={props.roleValue}
        onChange={props.setRoleValue}
        dropdownPosition="bottom"
      />
      <Text mt={10} size="sm" color="dimmed">
        Pick a role that you want to change for this user. Only the admin users can change the
        roles.
      </Text>
      <Select
        radius="xs"
        data={statuses}
        placeholder="Set user status"
        label="Pick status"
        value={props.statusValue}
        onChange={props.setStatusValue}
        dropdownPosition="bottom"
        mt={20}
      />
      <Text mt={10} size="sm" color="dimmed">
        Select either you want to disable this user or not.
      </Text>

      <Button
        radius="xs"
        fullWidth
        mt={30}
        onClick={props.changeRoleHandler}
        loading={props.changeRoleLoading}
      >
        Apply
      </Button>
    </Modal>
  );
};

export default RoleChangeModal;
