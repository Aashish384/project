import { ScrollArea } from "@mantine/core";
import { useRef, useEffect } from "react";
import Sent from "../../common/Sent";
import Received from "../../common/Received";

const Messages = (props) => {
  const scrollRef2 = useRef();

  const scrollToBottom = () => {
    scrollRef2.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.selectedConversation, props.conversationMessages]);

  return (
    <ScrollArea offsetScrollbars sx={{ height: "500px" }}>
      {props.conversationMessages.map((message) => {
        if (message.sender._id === props.myProfile._id) {
          return <Sent key={message._id} message={message} />;
        } else {
          return <Received key={message._id} message={message} />;
        }
      })}
      <div ref={scrollRef2}></div>
    </ScrollArea>
  );
};

export default Messages;
