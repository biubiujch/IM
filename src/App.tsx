import { Box, Textarea, Button, Flex, Text } from "@chakra-ui/react";
import { useState, useRef, ReactElement, useEffect } from "react";
import { useChat } from "./hooks";

function App() {
  const [msg, setMsg] = useState<string>("");
  const { messages, send } = useChat();

  const container = useRef<HTMLDivElement | null>(null);

  const handlePushMsg = () => {
    !!msg && send(msg);
    container.current && container.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    setMsg("");
  };

  useEffect(() => {
    if (container.current) {
    }
  }, []);

  return (
    <Flex h="100vh" direction="column">
      <Box h="70vh" p="30px" overflow="auto">
        {messages.map((msg) => (
          <Box key={msg.created_at}>
            <Text color="#999">{msg.user?.name || "unkonw"}</Text>
            <Text fontSize="3xl">{msg.text}</Text>
          </Box>
        ))}
        <Box ref={container}></Box>
      </Box>
      <Flex flex="1" padding="30" borderTop="1px solid #ccc">
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
    </Flex>
  );
}

export default App;
