import { useState } from "react";

import { Birthday } from "../features/Signup/components/Birthday";
import { Gender } from "../features/Signup/components/Gender";
import { Interests } from "../features/Signup/components/Interests";

import { Purpose } from "../features/Signup/components/Purpose";
import { SexualOrientatins } from "../features/Signup/components/SexualOrientations";
import { ShowMe } from "../features/Signup/components/ShowMe";
import { Username } from "../features/Signup/components/Username";

interface Profile {
  username: string;
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
  });

  const handleChangeProfile = <T,>(key: string, value: T) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePhase = (phase: Phase) => setPhase(phase);

  return (
    <>
      {phase === "username" && (
        <Username
          name={profile.username}
          onChange={handleChangeProfile}
          onChangePhase={handleChangePhase}
        />
      )}
      {phase === "gender" && <Gender />}
      {phase === "birthday" && <Birthday />}
      {phase === "showMe" && <ShowMe />}
      {phase === "purpose" && <Purpose />}
      {phase === "sexual" && <SexualOrientatins />}
      {phase === "interest" && <Interests />}
    </>
  );
};
