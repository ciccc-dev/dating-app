import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ProfileClient } from "../features/Discovery/api/profile";
import ProfileCard from "../features/Discovery/components/ProfileCard";
import { navigationWidth } from "../constants/navigation";
import { DiscoveryNavigation } from "../features/Discovery/components/Navigation";

export interface Profile {
  id: string;
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
      <StyledWrapper>
        <StyledNavigationWrapper component="nav">
          <DiscoveryNavigation />
        </StyledNavigationWrapper>
        <StyledContent component="main">
          {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: 300,
              height: 400,
            },
          }}
        > */}
          {profiles.map((profile) => (
            <ProfileCard profile={profile} key={profile.id} />
          ))}
          {/* </Box> */}
        </StyledContent>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled(Box)`
  display: flex;
`;

const StyledNavigationWrapper = styled(Box)`
  width: ${navigationWidth}px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledContent = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3px;
  width: calc(100% - ${navigationWidth}px);
  & > :not(style) {
    margin: 1.5rem;
    width: 300px;
    height: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
