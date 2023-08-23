import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { createContext, useEffect, useState } from "react";
import { _profileClient } from "../features/Discovery/api/profile";
import { navigationWidth } from "../constants/navigation";
import { DiscoveryNavigation } from "../features/Discovery/components/Navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { ProfileCard } from "../features/Discovery/components/ProfileCard";
import { Item } from "../features/Discovery/components/FilterDialog";
import { Photo } from "./Account";

interface isFilteredType {
  isFiltered: boolean;
  setIsfiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

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
  photos: Photo[];
  distance: number;
}

export const UserProfiles = createContext<string[]>([]);
export const isFilteredContext = createContext<isFilteredType>({
  isFiltered: false,
  setIsfiltered: () => {},
});
export const Discovery = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [profileId, setProfileId] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isFiltered, setIsfiltered] = useState<boolean>(false);
  const value = {
    isFiltered,
    setIsfiltered,
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const ProfileClient = new _profileClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          const data = await ProfileClient.getProfiles();
          setProfiles(data);
          if (user?.sub) {
            const data = await ProfileClient.getProfileId(user.sub);
            setProfileId(data.id);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchProfiles();
    setIsfiltered(false);
  }, [getAccessTokenSilently, user, isFiltered]);

  console.log(profiles);

  return (
    <>
      <StyledWrapper>
        <isFilteredContext.Provider value={value}>
          <StyledNavigationWrapper component="nav">
            <DiscoveryNavigation profileId={profileId} />
          </StyledNavigationWrapper>
          <UserProfiles.Provider value={profiles.map(({ id }) => id)}>
            <StyledContent component="main">
              {profiles.map((profile, index) => (
                <ProfileCard profile={profile} key={index} />
              ))}
            </StyledContent>
          </UserProfiles.Provider>
        </isFilteredContext.Provider>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled(Box)`
  display: flex;
  background-color: #f5f5f5;
`;

const StyledNavigationWrapper = styled(Box)`
  width: ${navigationWidth}px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledContent = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
