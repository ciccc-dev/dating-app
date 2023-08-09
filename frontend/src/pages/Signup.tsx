import { useEffect, useState } from "react";

import { Birthday } from "../features/Signup/components/Birthday";
import { Gender } from "../features/Signup/components/Gender";
import { Interests } from "../features/Signup/components/Interests";
import { Purpose } from "../features/Signup/components/Purpose";
import { SexualOrientatins } from "../features/Signup/components/SexualOrientations";
import { ShowMe } from "../features/Signup/components/ShowMe";
import { Username } from "../features/Signup/components/Username";

import { _ProfileAPI } from "../features/Profile";
import { useAuth0 } from "@auth0/auth0-react";

interface Profile {
  username: string;
  gender: string;
  birthday: string;
  showMe: string[];
  purposes: string[];
  sexualOrientation: string;
  interests: string[];
}

type Phase =
  | "username"
  | "gender"
  | "birthday"
  | "showMe"
  | "purpose"
  | "sexual"
  | "interest";

export const Signup = () => {
  const [phase, setPhase] = useState<Phase>("username");
  const [profile, setProfile] = useState<Profile>({
    username: "",
    gender: "",
    birthday: "",
    showMe: [],
    purposes: [],
    sexualOrientation: "",
    interests: [],
  });
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
    })();
  }, [getAccessTokenSilently]);

  const handleChangeProfile = <T,>(key: string, value: T) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const handleChangePhase = (phase: Phase) => setPhase(phase);

  const CreateProfile = async () => {
    const ProfileAPI = new _ProfileAPI(
      process.env.REACT_APP_SERVER_URL ?? "",
      token
    );
    console.log(profile.sexualOrientation);
    const result = await ProfileAPI.CreatePost({
      username: profile.username,
      gender: profile.gender,
      birthday: profile.birthday,
      sexualOrientation: profile.sexualOrientation,
      aboutMe: "",
    });
    console.log(result);
  };

  return (
    <>
      {phase === "username" && (
        <Username
          name={profile.username}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "gender" && (
        <Gender
          value={profile.gender}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "birthday" && (
        <Birthday
          value={profile.birthday}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "showMe" && (
        <ShowMe
          values={profile.showMe}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "purpose" && (
        <Purpose
          values={profile.purposes}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "sexual" && (
        <SexualOrientatins
          value={profile.sexualOrientation}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "interest" && (
        <Interests
          values={profile.interests}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
          onCreate={CreateProfile}
        />
      )}
    </>
  );
};
