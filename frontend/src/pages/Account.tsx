import { Box, Divider, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { _profileClient } from "../features/Discovery/api/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Item } from "../features/Discovery/components/Navigation";
import { ProfilePhotos } from "../features/Account/components/ProfilePhotos";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { FilterDialog } from "../features/Discovery/components/FilterDialog";
import { purposes } from "../constants/purposes";
import { _interestClient } from "../features/Discovery/api/interest";
import { sexualOrientations } from "../constants/sexualOrientations";
import { lookingFor } from "../constants/lookingfor";
import { gender } from "../constants/gender";

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
  const [isBasicInfoEditable, setIsBasicInfoEditable] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [interests, setInterests] = useState<Item[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestChecked, setInterestChecked] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [purposeChecked, setPurposeChecked] = useState(false);

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

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const InterestClient = new _interestClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          const data = await InterestClient.getInterests();
          setInterests(data);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchInterests();
  }, [getAccessTokenSilently]);

  const handleEditBasicInfoClick = () => {
    setIsBasicInfoEditable(!isBasicInfoEditable);
  };

  const handleEditProfileClick = () => {
    setIsProfileEditable(!isProfileEditable);
  };

  const handleSelectedPurposesChange = (values: string[]) => {
    setSelectedPurposes(values);
  };

  const handleSelectedInterestsChange = (values: string[]) => {
    setSelectedInterests(values);
  };

  return (
    <>
      <StyledContainer>
        <StyledAside>
          <ProfilePhotos />
        </StyledAside>
        <StyledMain>
          <StyledForm component="form">
            <StyledTitleWrapper>
              <StyledTitle>Basic Information</StyledTitle>
              <StlyedEditNoteIcon onClick={handleEditBasicInfoClick} />
            </StyledTitleWrapper>
            <StyledDivder />
            <StyledSection>
              <StyledSubTitle>Name</StyledSubTitle>
              <StyledSubDivder />
              {isBasicInfoEditable ? (
                <StyledTextField
                  id="outlined-basic"
                  variant="outlined"
                  value={user?.name}
                />
              ) : (
                <StyledReadOnly>{user?.name}</StyledReadOnly>
              )}
              <StyledSubTitle>Email</StyledSubTitle>
              <StyledSubDivder />
              {isBasicInfoEditable ? (
                <StyledTextField
                  id="outlined-basic"
                  variant="outlined"
                  value={user?.email}
                />
              ) : (
                <StyledReadOnly>{user?.email}</StyledReadOnly>
              )}
            </StyledSection>
          </StyledForm>
          <StyledForm component="form">
            <StyledTitleWrapper>
              <StyledTitle>Profile</StyledTitle>
              <StlyedEditNoteIcon onClick={handleEditProfileClick} />
            </StyledTitleWrapper>
            <StyledDivder />
            <StyledSection>
              <StyledSubTitle>User Name</StyledSubTitle>
              <StyledSubDivder />
              {isProfileEditable ? (
                <StyledTextField
                  id="outlined-basic"
                  variant="outlined"
                  value={profile?.userName}
                />
              ) : (
                <StyledReadOnly>{profile?.userName}</StyledReadOnly>
              )}
              <StyledSubTitle>Birthday</StyledSubTitle>
              <StyledSubDivder />
              {isProfileEditable ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StyledDatePicker value={parseISO(profile!.birthday)} />
                </LocalizationProvider>
              ) : (
                <StyledReadOnly>{profile?.birthday}</StyledReadOnly>
              )}
              <StyledSubTitle>Gender</StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                <StyledItem>{profile?.gender}</StyledItem>
                {isProfileEditable && (
                  <FilterDialog
                    type="radio"
                    title=""
                    items={gender}
                    selectedItems={profile?.gender ? [profile?.gender] : []}
                    onChange={handleSelectedPurposesChange}
                  />
                )}
              </StyledValue>
              <StyledSubTitle>About Me</StyledSubTitle>
              <StyledSubDivder />
              {isProfileEditable ? (
                <StyledTextarea
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  value={profile?.aboutMe}
                />
              ) : (
                <StyledAboutMe>{profile?.aboutMe}</StyledAboutMe>
              )}
              <StyledSubTitle>Sexual Orientation</StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                <StyledItem>{profile?.sexualOrientation}</StyledItem>
                {isProfileEditable && (
                  <FilterDialog
                    type="radio"
                    title=""
                    items={sexualOrientations}
                    selectedItems={
                      profile?.sexualOrientation
                        ? [profile.sexualOrientation]
                        : []
                    }
                    onChange={handleSelectedPurposesChange}
                  />
                )}
              </StyledValue>
              <StyledSubTitle>Interests</StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                {profile?.interests.map(({ name }) => (
                  <StyledItem key={name}>{name}</StyledItem>
                ))}
                {isProfileEditable && (
                  <FilterDialog
                    type="checkbox"
                    title=""
                    items={interests}
                    selectedItems={
                      profile?.interests.map(({ name }) => name) || []
                    }
                    onChange={handleSelectedInterestsChange}
                  />
                )}
              </StyledValue>
              <StyledSubTitle>Purposes</StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                {profile?.purposes.map(({ name }) => (
                  <StyledItem key={name}>{name}</StyledItem>
                ))}
                {isProfileEditable && (
                  <FilterDialog
                    type="checkbox"
                    title=""
                    items={purposes}
                    selectedItems={
                      profile?.purposes.map(({ name }) => name) || []
                    }
                    onChange={handleSelectedPurposesChange}
                  />
                )}
              </StyledValue>
            </StyledSection>
          </StyledForm>
        </StyledMain>
      </StyledContainer>
    </>
  );
};

const StyledAside = styled(Box)`
  width: 400px;
  padding: 50px 25px 0 25px;
  border-right: 3px solid rgba(0, 0, 0, 0.12);
`;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  box-sizing: border-box;
`;

const StyledMain = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;

const StyledForm = styled(Box)``;

const StyledTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StlyedEditNoteIcon = styled(EditNoteIcon)`
  font-size: 3rem;
`;

const StyledDivder = styled(Divider)`
  border-bottom-width: medium;
`;

const StyledSubDivder = styled(Divider)``;

const StyledSection = styled("section")`
  padding: 0 1.5rem;
`;

const StyledReadOnly = styled(Box)`
  padding: 0 1rem 0.5rem 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const StyledDatePicker = styled(DatePicker)`
  & .MuiOutlinedInput-root {
    margin-top: 0.5rem;
  }
  & .MuiOutlinedInput-input {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
`;

const StyledValue = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  margin-top: 0.7rem;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    margin-top: 0.5rem;
  }
  & .MuiOutlinedInput-input {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }
`;

const StyledAboutMe = styled("p")`
  font-size: 1.5rem;
`;

const StyledTitle = styled("h1")`
  margin: 1rem 0 0.5rem 0;
`;

const StyledSubTitle = styled("h2")`
  margin: 1rem 0 0.3rem 0;
`;

const StyledItem = styled("span")`
  border: 1px solid black;
  border-radius: 1.2rem;
  font-size: 1.2rem;
  margin: 0.5rem 1rem 0 0;
  padding: 0.3rem 1rem;
`;
