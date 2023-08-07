import { Box, Button, Divider, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { _profileClient } from "../features/Discovery/api/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Item } from "../features/Discovery/components/Navigation";
import { ProfilePhotos } from "../features/Account/components/ProfilePhotos";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { purposes } from "../constants/purposes";
import { _interestClient } from "../features/Discovery/api/interest";
import { sexualOrientations } from "../constants/sexualOrientations";
import { gender } from "../constants/gender";
import { Controller, useForm } from "react-hook-form";
import { FilterDialog } from "../features/Discovery/components/FilterDialog";

export interface ProfileHookForm {
  name: string;
  email: string;
  userName: string;
  aboutMe: string;
  birthday: string;
}

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

const defaultAccount = {
  name: "",
  email: "",
};

const defaultProfile = {
  id: "",
  userId: "",
  userName: "",
  birthday: "",
  gender: "",
  sexualOrientation: "",
  aboutMe: "",
  registeredAt: new Date(),
  updatedAt: new Date(),
  purposes: [],
  interests: [],
};

export const Account = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isUserAccountEditable, setIsUserAccountEditable] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [interests, setInterests] = useState<Item[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileHookForm>();
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
            console.log(data);
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

  const handleEditUserAccountClick = () => {
    setIsUserAccountEditable(!isUserAccountEditable);
  };

  const handleEditProfileClick = () => {
    setIsProfileEditable(!isProfileEditable);
  };

  const handleChange = <T,>(title: string, value: T) => {
    setProfile({ ...profile, [title]: value });
  };

  const onSubmit = async (data: ProfileHookForm) => {
    const updateProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const ProfileClient = new _profileClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          return await ProfileClient.updateProfile(data, profile);
        }
      } catch (error) {
        throw error;
      }
    };
    const result = await updateProfile();
    if (result) handleEditProfileClick();
  };

  return (
    <>
      <StyledContainer>
        <StyledAside>
          <ProfilePhotos />
        </StyledAside>
        <StyledMain>
          <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <StyledTitleWrapper>
              <StyledTitle>User Account</StyledTitle>
              {isUserAccountEditable ? (
                <StlyedIconsWrapper>
                  <Button variant="outlined" type="submit">
                    Save
                  </Button>
                  <StyledCancelPresentationIcon
                    onClick={handleEditUserAccountClick}
                  />
                </StlyedIconsWrapper>
              ) : (
                <StlyedEditNoteIcon onClick={handleEditUserAccountClick} />
              )}
            </StyledTitleWrapper>
            <StyledDivder />
            <StyledSection>
              <StyledSubTitle>
                <span>Name</span>
              </StyledSubTitle>
              <StyledSubDivder />
              {isUserAccountEditable ? (
                <StyledTextField
                  id="name"
                  variant="outlined"
                  defaultValue={user?.name}
                  {...register("name", {
                    required: "please enter a valid name",
                  })}
                />
              ) : (
                <StyledReadOnly>{user?.name}</StyledReadOnly>
              )}
              <StyledSubTitle>
                <span>Email</span>
              </StyledSubTitle>
              <StyledSubDivder />
              {isUserAccountEditable ? (
                <>
                  <StyledTextField
                    id="email"
                    variant="outlined"
                    defaultValue={user?.email}
                    {...register("email", {
                      required: "please enter a valid email address",
                    })}
                  />
                  {errors.email?.message && (
                    <p>{String(errors.email.message)}</p>
                  )}
                </>
              ) : (
                <StyledReadOnly>{user?.email}</StyledReadOnly>
              )}
            </StyledSection>
          </StyledForm>
          <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <StyledTitleWrapper>
              <StyledTitle>Profile</StyledTitle>
              {isProfileEditable ? (
                <>
                  <StlyedIconsWrapper>
                    <Button variant="outlined" type="submit">
                      Save
                    </Button>
                    <StyledCancelPresentationIcon
                      onClick={handleEditProfileClick}
                    />
                  </StlyedIconsWrapper>
                </>
              ) : (
                <StlyedEditNoteIcon onClick={handleEditProfileClick} />
              )}
            </StyledTitleWrapper>
            <StyledDivder />
            <StyledSection>
              <StyledSubTitle>
                <span>User Name</span>
              </StyledSubTitle>
              <StyledSubDivder />
              {isProfileEditable ? (
                <StyledTextField
                  id="userName"
                  variant="outlined"
                  defaultValue={profile?.userName}
                  {...register("userName", {
                    required: "please enter a valid user name",
                  })}
                />
              ) : (
                <StyledReadOnly>{profile?.userName}</StyledReadOnly>
              )}
              <StyledSubTitle>
                <span>Birthday</span>
              </StyledSubTitle>
              <StyledSubDivder />
              {isProfileEditable ? (
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field: { onChange } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <StyledDatePicker
                        defaultValue={parseISO(profile!.birthday)}
                        onChange={onChange}
                      />
                    </LocalizationProvider>
                  )}
                />
              ) : (
                <StyledReadOnly>{profile?.birthday}</StyledReadOnly>
              )}
              <StyledSubTitle>
                <span>Gender</span>
                <span>
                  {isProfileEditable && (
                    <FilterDialog
                      type="radio"
                      title=""
                      property="gender"
                      datatype="string"
                      items={gender}
                      selectedItems={profile?.gender}
                      onChange={handleChange}
                    />
                  )}
                </span>
              </StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                <StyledItem>{profile?.gender}</StyledItem>
              </StyledValue>
              <StyledSubTitle>
                <span>About Me</span>
              </StyledSubTitle>
              <StyledSubDivder />
              {isProfileEditable ? (
                <StyledTextarea
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  defaultValue={profile?.aboutMe}
                  {...register("aboutMe", {
                    required: "please enter a valid about me",
                  })}
                />
              ) : (
                <StyledAboutMe>{profile?.aboutMe}</StyledAboutMe>
              )}
              <StyledSubTitle>
                <span>Sexual Orientation</span>
                <span>
                  {isProfileEditable && (
                    <FilterDialog
                      type="radio"
                      title=""
                      property="sexualOrientation"
                      datatype="string"
                      items={sexualOrientations}
                      selectedItems={profile?.sexualOrientation}
                      onChange={handleChange}
                    />
                  )}
                </span>
              </StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                <StyledItem>{profile?.sexualOrientation}</StyledItem>
              </StyledValue>
              <StyledSubTitle>
                <span>Interests</span>
                <span>
                  {isProfileEditable && (
                    <FilterDialog
                      type="checkbox"
                      title=""
                      property="interests"
                      datatype="objectArray"
                      items={interests}
                      selectedItems={profile?.interests}
                      onChange={handleChange}
                    />
                  )}
                </span>
              </StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                {profile?.interests.map(({ name }) => (
                  <StyledItem key={name}>{name}</StyledItem>
                ))}
              </StyledValue>
              <StyledSubTitle>
                <span>Purposes</span>
                <span>
                  {isProfileEditable && (
                    <FilterDialog
                      type="checkbox"
                      title=""
                      property="purposes"
                      datatype="objectArray"
                      items={purposes}
                      selectedItems={profile?.purposes}
                      onChange={handleChange}
                    />
                  )}
                </span>
              </StyledSubTitle>
              <StyledSubDivder />
              <StyledValue>
                {profile?.purposes.map(({ name }) => (
                  <StyledItem key={name}>{name}</StyledItem>
                ))}
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

const StlyedIconsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
`;

const StlyedEditNoteIcon = styled(EditNoteIcon)`
  font-size: 3rem;
`;

const StyledCancelPresentationIcon = styled(CancelPresentationIcon)`
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
  width: 40%;
  & .MuiOutlinedInput-root {
    margin-top: 0.5rem;
  }
  & .MuiOutlinedInput-input {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 40%;
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
  width: 40%;
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
  vertical-align: middle;
  margin: 1rem 0 0.3rem 0;
`;

const StyledItem = styled("span")`
  border: 1px solid black;
  border-radius: 1.2rem;
  font-size: 1.2rem;
  margin: 0.5rem 1rem 0 0;
  padding: 0.3rem 1rem;
`;
