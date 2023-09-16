import { useEffect } from "react";
import { Card, Container, Table, Loader, Box } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { fetchExpertApplications } from "../../../features/user/userSlice";
import ExpertApplication from "./ExpertApplication";

const ManageExpertApplications = (props) => {
  const dispatch = useDispatch();
  const { expertApplications, expertApplicationsLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchExpertApplications());
  }, []);

  let renderExpertApplications = <Loader />;
  if (expertApplicationsLoading) {
    renderExpertApplications = <Loader />;
  } else if (expertApplications) {
    renderExpertApplications = (
      <Container size="sm">
        {expertApplications.map((application) => (
          <ExpertApplication key={application._id} application={application} />
        ))}
      </Container>
    );
  }

  return (
    <Card withBorder shadow="md" mt={10} radius="xs">
      {renderExpertApplications}
    </Card>
  );
};

export default ManageExpertApplications;
