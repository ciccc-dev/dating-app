import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { _MessagesAPI } from "../features/Messages/api";
import { Message } from "../features/Messages/types";

export const useFetchMessages = () => {
  const [messages, setMessages] = useState<{ messages: Message[] }>({
    messages: [],
  });
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const MessageAPI = new _MessagesAPI(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        setMessages(await MessageAPI.FetchMessages());
      }
    })();
  }, [getAccessTokenSilently]);

  return messages;
};
