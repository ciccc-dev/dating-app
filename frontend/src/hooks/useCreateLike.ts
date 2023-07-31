import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { _LikesAPI } from "../features/Likes";

export const useCreateLike = (): [
  { result: boolean; message: string },
  (userId: string) => Promise<void>
] => {
  const { getAccessTokenSilently } = useAuth0();
  const [result, setResult] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const LikesAPI = new _LikesAPI(process.env.REACT_APP_SERVER_URL ?? "", token);

  useEffect(() => {
    (async () => {
      setToken(await getAccessTokenSilently());
    })();
  }, [getAccessTokenSilently]);

  const CreateLike = async (userId: string) => {
    const result = await LikesAPI.CreateLike(userId);
    setResult(result.status === 201 ? true : false);
    setMessage(result.message);
  };

  return [{ result, message }, CreateLike];
};
