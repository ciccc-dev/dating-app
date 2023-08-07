import { useState } from "react";

import { Birthday } from "../features/Signup/components/Birthday";
import { Gender } from "../features/Signup/components/Gender";
import { Interests } from "../features/Signup/components/Interests";

import { Purpose } from "../features/Signup/components/Purpose";
import { SexualOrientatins } from "../features/Signup/components/SexualOrientations";
import { ShowMe } from "../features/Signup/components/ShowMe";
import { Username } from "../features/Signup/components/Username";

export const Signup = () => {
  const [phase, setPhase] = useState("interest");
  const [profile, setProfile] = useState("");

  return (
    <>
      {phase === "username" && <Username />}
      {phase === "gender" && <Gender />}
      {phase === "birthday" && <Birthday />}
      {phase === "showMe" && <ShowMe />}
      {phase === "purpose" && <Purpose />}
      {phase === "sexual" && <SexualOrientatins />}
      {phase === "interest" && <Interests />}
    </>
  );
};
