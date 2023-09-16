import { Text, Flex } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MdOutlineClose } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";

const AddChallengeImage = (props) => {
  let idleContent;
  if (!props.image) {
    idleContent = (
      <Flex gap={16}>
        <Text>Challenge image</Text>
        <CiImageOn size={26} />
      </Flex>
    );
  } else {
    const url = URL.createObjectURL(props.image[0]);
    idleContent = (
      <img
        alt="Challenge Image"
        src={url}
        style={{
          height: "100px",
          width: "100px",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      onDrop={props.onImageDrop}
      onReject={props.onImageReject}
      sx={{
        height: "100%",
        width: "100%",
        margin: "8px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Dropzone.Idle>{idleContent}</Dropzone.Idle>
      <Dropzone.Reject>
        <MdOutlineClose size={28} />
      </Dropzone.Reject>
      <Dropzone.Accept>
        <BiUpload size={28} />
      </Dropzone.Accept>
    </Dropzone>
  );
};

export default AddChallengeImage;
