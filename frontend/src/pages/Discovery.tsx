import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { FilterClient } from "../features/Discovery/api/filter";
import { ProfileClient } from "../features/Discovery/api/profile";
import { UUID } from "crypto";
import ImgMediaCard from "../features/Discovery/components/ProfileCard";

export interface Profile {
  id: UUID;
  userId: string;
  userName: string;
  birthday: Date;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
}

export const Discovery = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await FilterClient.getFilters();
        const data = await ProfileClient.getProfiles();
        if (data) {
          setProfiles(data);
        }
      } catch (error) {
        // Handle errors
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 3,
            width: 300,
            height: 400,
          },
        }}
      >
        {profiles.map((profile) => (
          <ImgMediaCard profile={profile} />
        ))}
      </Box>
    </>
  );
};
