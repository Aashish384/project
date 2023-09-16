import {
  Box,
  Text,
  Title,
  TextInput,
  Flex,
  Button,
  Card,
  Container,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UploadDocuments from "./UploadDocuments";
import { successNotification } from "../../utils/showNotification";
import { applyExpert, reset } from "../../features/user/userSlice";

export default function ApplyExpert() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applyExpertLoading, applyExpertSuccess } = useSelector((state) => state.user);

  const form = useForm({
    initialValues: {
      message: "",
      files: [],
    },
  });

  const onPDFDropHandler = (files) => {
    form.setFieldValue("files", files);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();
    if (!hasErrors) {
      let expertData = new FormData();
      Object.keys(form.values).forEach((value) => {
        if (value === "files") {
          for (let i = 0; i < form.values.files.length; i++) {
            expertData.append("files", form.values.files[i]);
          }
        } else {
          expertData.append([value], form.values[value]);
        }
      });
      dispatch(applyExpert(expertData));
    }
  };

  useEffect(() => {
    if (applyExpertSuccess) {
      successNotification({
        title: "Application success",
        message: "Your application has been sent successfully",
      });
      dispatch(reset());
      navigate("/explore", { replace: true });
    }
  }, [applyExpertLoading, applyExpertSuccess]);

  return (
    <Box>
      <Container size="sm">
        <Card shadow="sm">
          <Title order={3} mb={20}>
            Apply for an Expert
          </Title>
          <form onSubmit={formSubmitHandler}>
            <Flex direction="column">
              <Textarea
                label="Your message"
                required
                placeholder="Tell us why you want to be an expert"
                minRows={4}
                mb={20}
                {...form.getInputProps("message")}
              />
              <UploadDocuments files={form.values.files} onPDFDropHandler={onPDFDropHandler} />
              <Button mt={20} type="submit" loading={applyExpertLoading}>
                Apply
              </Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Box>
  );
}
