import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { _profileClient } from "../features/Discovery/api/profile";
import { navigationWidth } from "../constants/navigation";
import { DiscoveryNavigation } from "../features/Discovery/components/Navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileCard } from "../features/Discovery/components/ProfileCard";
import { Item } from "../features/Discovery/components/FilterDialog";

export interface Profile {
  id: string;
  userId: string;
  userName: string;
  age: number;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
  purposes: Item[];
  interests: Item[];
}

export const Discovery = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [profileId, setProfileId] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isFiltered, setIsfiltered] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileId = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const ProfileClient = new _profileClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          if (user?.sub) {
            const data = await ProfileClient.getProfileId(user.sub);
            setProfileId(data.id);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchProfileId();
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (profileId) {
          const token = await getAccessTokenSilently();
          if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
            const ProfileClient = new _profileClient(
              process.env.REACT_APP_SERVER_URL ?? "",
              token
            );
            const data = await ProfileClient.getProfiles(profileId);
            setProfiles(data);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchProfiles();
    setIsfiltered(false);
  }, [getAccessTokenSilently, user, profileId, isFiltered]);

  const handleClick = () => {
    setIsfiltered(true);
  };

  return (
    <>
      <StyledWrapper>
        <StyledNavigationWrapper component="nav">
          <DiscoveryNavigation profileId={profileId} onClick={handleClick} />
        </StyledNavigationWrapper>
        <StyledContent component="main">
          {profiles.map((profile) => (
            <ProfileCard profile={profile} key={profile.id} />
          ))}
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
  flex-direction: row;
  justify-content: center;
  align-item: center;
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
