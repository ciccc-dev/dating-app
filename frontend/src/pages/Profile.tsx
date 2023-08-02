import { Divider, styled } from "@mui/material";
import { navigationWidth } from "../constants/navigation";

export const Profile = () => {
  return (
    <>
      <StyledContainer>
        <StlyleAside></StlyleAside>
        <StyleMain>
          <StyleTitle>Akito Tobita</StyleTitle>
          <h2>Birthday:</h2>
          <h2>Gender:</h2>
          <h2>Location:</h2>
          <Divider />
          <StyleTitle>About Me</StyleTitle>
          <Divider />
          <StyleTitle>Sexual Orientation</StyleTitle>
          <Divider />
          <StyleTitle>Interests</StyleTitle>
          <Divider />
          <StyleTitle>Purpose</StyleTitle>
          <Divider />
        </StyleMain>
      </StyledContainer>
    </>
  );
};

const StlyleAside = styled("div")`
  width: ${navigationWidth}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const StyledContainer = styled("div")`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const StyleMain = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 2rem;
  width: 100%;
`;

const StyleTitle = styled("h1")`
  margin: 1rem 0 0.5rem 0;
`;
