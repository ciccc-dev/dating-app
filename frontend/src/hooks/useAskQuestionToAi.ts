import { useEffect, useState } from "react";
import { _OpenAiAPI } from "../features/OpenAi";
import { useAuth0 } from "@auth0/auth0-react";

interface Question {
  to: string;
  text: string;
}

export const useAskQuestionToAi = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [client, setClient] = useState<_OpenAiAPI | undefined>(undefined);
  const [question, setQuestion] = useState<Question>({ to: "", text: "" });
  const [answer, setAnswer] = useState("");

  const ask = (userId: string, question: string) => {
    setQuestion({ to: userId, text: question });
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const OpenAiApi = new _OpenAiAPI(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        setClient(OpenAiApi);
      }
    })();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    (async () => {
      if (question.to.length > 0 ?? question.text.length > 0) {
        const answer = await client?.AskAboutUser(question.to, question.text);
        answer && setAnswer(answer.reply);
      }
    })();
  }, [client, question]);

  return { answer, ask };
};
