import { Text, Box, Loader, Avatar } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OnlineUser from "./OnlineUser";
import { fetchUsers } from "../../../features/chat/chatSlice";
import { errorNotification } from "../../../utils/showNotification";

const OnlineUsers = (props) => {
  const dispatch = useDispatch();
  const { allUsersLoading, fetchUserSuccess, isFetchUserError, fetchUserError, allUsers } =
    useSelector((state) => state.chat);
  const { myProfileLoading, myProfile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (isFetchUserError) {
      errorNotification({ title: "Error", message: fetchUserError });
    }
  }, [isFetchUserError, fetchUserError]);

  let renderUsers = <Loader />;

  if (allUsersLoading) {
    renderUsers = <Loader />;
  } else if (allUsers && fetchUserSuccess) {
    if (!myProfileLoading) {
      const newAllUsers = allUsers.filter((el) => el._id !== myProfile._id && el.enabled == true);
      renderUsers = newAllUsers.map((user) => (
        <OnlineUser
          key={user._id}
          user={user}
          onlineUsers={props.onlineUsers}
          userInfo={props.userInfo}
        />
      ));
    } else {
      renderUsers = allUsers.map((user) => (
        <OnlineUser
          key={user._id}
          user={user}
          onlineUsers={props.onlineUsers}
          userInfo={props.userInfo}
        />
      ));
    }
  }

  return <Box>{renderUsers}</Box>;
};

export default OnlineUsers;
