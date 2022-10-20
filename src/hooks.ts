import { StreamChat, Channel, DefaultGenerics, MessageResponse } from "stream-chat";
import { useEffect, useState, useRef, useCallback, useMemo, useContext } from "react";
import { DataContext } from "./context";

const APP_KEY = "rhdr7rdrfz2z";
const USER_ID = "jlahey";
const USER_NAME = "Jim Lahey";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.YHdgCF_W0FFRh-TreRrHRCB_a5b_ALwAjCv5YjUiOBc";

export const useChat = () => {
  const client = StreamChat.getInstance(APP_KEY);
  const msgData = useContext(DataContext);
  const container = useRef<Channel<DefaultGenerics>>();
  const [messages, setMessages] = useState<MessageResponse<DefaultGenerics>[]>(msgData.messages);

  const handleConnect = useCallback(async () => {
    await client.connectUser(
      {
        id: USER_ID,
        name: USER_NAME,
      },
      TOKEN
    );

    const channel = client.channel("messaging", "travel", {
      name: "Awesome channel about traveling",
    });

    container.current = channel;
    await channel.watch();
  }, []);

  useEffect(() => {
    handleConnect();
  }, []);

  useEffect(() => {
    if (container.current) {
      const channel = container.current;
      channel.on("message.new", (event) => {
        if (event.message) {
          const newMessages = [...msgData.messages, event.message];
          msgData.set(newMessages);
          setMessages(newMessages);
        }
      });
    }
  }, [container.current]);

  const send = async (text: string) => {
    if (container.current) {
      const channel = container.current;
      const response = await channel.sendMessage({
        text,
        customField: "123",
      });
    }
  };

  return {
    send,
    messages,
  };
};
