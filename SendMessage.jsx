import { Flex, TextInput, Button, useMantineTheme } from "@mantine/core";
import Joi from "joi";
import { useForm, joiResolver } from "@mantine/form";
import { BiSend } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { sendMessage } from "../../features/chat/chatSlice";

const schema = Joi.object({
  message: Joi.string().required().messages({
    "string.empty": "Message is required",
  }),
});

const SendMessage = (props) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      message: "",
    },
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (!hasErrors) {
      const message = {
        text: form.values.message,
        conversationId: props.selectedConversation._id,
      };
      dispatch(sendMessage(message));

      const receiverInfo = props.selectedConversation?.members.find(
        (member) => member._id !== props.myProfile._id
      );
      props.socket.current.emit("sendMessage", {
        senderInfo: props.myProfile,
        receiverInfo: receiverInfo,
        text: form.values.message,
      });
      form.setFieldValue("message", "");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Flex align="center">
        <TextInput
          radius="xs"
          variant="filled"
          style={{ flex: 1 }}
          placeholder="Enter your message"
          {...form.getInputProps("message")}
        />
        <Button type="submit" rightIcon={<BiSend size={18} />} ml={10} mr={20} radius="xs">
          Send
        </Button>
      </Flex>
    </form>
  );
};

export default SendMessage;
