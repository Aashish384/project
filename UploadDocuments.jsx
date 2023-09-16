import { Text, SimpleGrid } from "@mantine/core";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";

const UploadDocuments = (props) => {
  const previews = props.files.map((file, index) => {
    console.log(file);
    return <Text key={index}>{file.name}</Text>;
  });

  return (
    <div>
      <Dropzone multiple accept={PDF_MIME_TYPE} onDrop={(files) => props.onPDFDropHandler(files)}>
        <Text align="center">Documents in PDF format</Text>
      </Dropzone>
      <SimpleGrid
        cols={1}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </div>
  );
};

export default UploadDocuments;
