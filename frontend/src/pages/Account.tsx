import { Box, Divider, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { _profileClient } from "../features/Discovery/api/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Item } from "../features/Discovery/components/Navigation";

export interface Profile {
  id: string;
  userId: string;
  userName: string;
  birthday: string;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
  purposes: Item[];
  interests: Item[];
}

export const Account = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user, getAccessTokenSilently } = useAuth0();
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
            const data = await ProfileClient.getProfile(user.sub);
            setProfile(data);
            console.log(user);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchProfileId();
  }, [getAccessTokenSilently, user]);

  return (
    <>
      <StyledContainer>
        <StlyleAside>
          <StyleImg
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="profile1"
          />
          <StyleImg
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="profile1"
          />
          <StyleImg
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="profile1"
          />
          <StyleImg
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="profile1"
          />
          <StyleImg
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="profile1"
          />
        </StlyleAside>
        <StyleMain>
          <div>
            <StyleTitle>Basic Information</StyleTitle>
            <StyleDivder />
            <StyleSection>
              <StyleSubTitle>Name</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                <span>{user?.name}</span>
              </StyledValue>
              <StyleSubTitle>Email</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                <span>{user?.email}</span>
              </StyledValue>
            </StyleSection>
            <StyleTitle>Profile</StyleTitle>
            <StyleDivder />
            <StyleSection>
              <StyleSubTitle>User Name</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                <span>{profile?.userName}</span>
              </StyledValue>
              <StyleSubTitle>Birthday</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                <span>{profile?.birthday}</span>
              </StyledValue>
              <StyleSubTitle>Gender</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                <StyleItem>{profile?.gender}</StyleItem>
              </StyledValue>
              <StyleSubTitle>About Me</StyleSubTitle>
              <StyleSubDivder />
              <StyledAboutMe>{profile?.aboutMe}</StyledAboutMe>
              <StyleSubTitle>Sexual Orientation</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                <StyleItem>{profile?.sexualOrientation}</StyleItem>
              </StyledValue>
              <StyleSubTitle>Interests</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                {profile?.interests.map(({ name }) => (
                  <StyleItem key={name}>{name}</StyleItem>
                ))}
              </StyledValue>
              <StyleSubTitle>Purpose</StyleSubTitle>
              <StyleSubDivder />
              <StyledValue>
                {profile?.purposes.map(({ name }) => (
                  <StyleItem key={name}>{name}</StyleItem>
                ))}
              </StyledValue>
            </StyleSection>
          </div>
        </StyleMain>
      </StyledContainer>
    </>
  );
};

const StlyleAside = styled(Box)`
  width: 500px;
  border-right: 3px solid rgba(0, 0, 0, 0.12);
`;

const StyleImg = styled("img")`
  display: block;
  width: 300px;
  height: 400px;
`;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  box-sizing: border-box;
`;

const StyleMain = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 2rem;
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;

const StyleDivder = styled(Divider)`
  border-bottom-width: medium;
`;

const StyleSubDivder = styled(Divider)``;

const StyleSection = styled("section")`
  padding: 0 1.5rem;
`;

const StyledValue = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  margin-top: 0.7rem;
`;

const StyledAboutMe = styled("p")`
  font-size: 1.2rem;
`;

const StyleTitle = styled("h1")`
  margin: 1rem 0 0.5rem 0;
`;

const StyleSubTitle = styled("h2")`
  margin: 1rem 0 0.3rem 0;
`;

const StyleItem = styled("span")`
  border: 1px solid black;
  border-radius: 1.2rem;
  font-size: 1.2rem;
  margin: 0.5rem 1rem 0 0;
  padding: 0.3rem 1rem;
`;
