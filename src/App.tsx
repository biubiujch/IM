import { Box, Textarea, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [msgs, setMsgs] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>("");

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.code = "Enter")) handlePushMsg();
  };

  const handlePushMsg = () => {
    !!msg && setMsgs([...msgs, msg]);
    setMsg("");
  };

  return (
    <Box h="100vh">
      <Box h="70vh" p="30px">
        {msgs.map((text, index) => (
          <Text key={text + "_" + index}>{text}</Text>
        ))}
      </Box>
      <Flex h="30vh" padding="30" borderTop="1px solid #ccc">
        <Textarea
          placeholder="input message"
          h="100%"
          w="80%"
          resize="none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button h="100%" flex="1" onClick={handlePushMsg}>
          send
        </Button>
      </Flex>
    </Box>
  );
}

export default App;
