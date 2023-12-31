import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { Birthday } from "../features/Signup/components/Birthday";
import { Gender } from "../features/Signup/components/Gender";
import { Interests } from "../features/Signup/components/Interests";
import { Purpose } from "../features/Signup/components/Purpose";
import { SexualOrientatins } from "../features/Signup/components/SexualOrientations";
import { ShowMe } from "../features/Signup/components/ShowMe";
import { Username } from "../features/Signup/components/Username";
import { _profileClient } from "../features/Discovery/api/profile";
import { NotificationBar } from "../components/NotificationBar";
import { useDialogState } from "../hooks/useDialogState";
import { _interestClient } from "../features/Discovery/api/interest";

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
  const navigate = useNavigate();
  const [isOpen, { open, close }] = useDialogState();
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
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
      const ProfileAPI = new _profileClient(
        process.env.REACT_APP_SERVER_URL ?? "",
        token
      );
      const result = await ProfileAPI.getProfile(user?.sub ?? "");
      if (result) navigate("/discovery");
    })();
  }, [getAccessTokenSilently, navigate, user?.sub]);

  const handleChangeProfile = <T,>(key: string, value: T) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const handleChangePhase = (phase: Phase) => setPhase(phase);

  const CreateProfile = async () => {
    const ProfileAPI = new _profileClient(
      process.env.REACT_APP_SERVER_URL ?? "",
      token
    );
    const InterestAPI = new _interestClient(
      process.env.REACT_APP_SERVER_URL ?? "",
      token
    );

    const interests = await InterestAPI.getInterests(profile.interests);

    const result = await ProfileAPI.CreateProfile({
      username: profile.username,
      gender: profile.gender,
      birthday: profile.birthday,
      sexualOrientation: profile.sexualOrientation,
      showMe: profile.showMe,
      purposes: profile.purposes,
      aboutMe: "",
      interests,
    });
    if (!result.status) return open();
    navigate("/discovery");
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
      <NotificationBar
        isOpen={isOpen}
        onClose={close}
        isSuccess={false}
        message='Signup failed'
      />
    </>
  );
};
