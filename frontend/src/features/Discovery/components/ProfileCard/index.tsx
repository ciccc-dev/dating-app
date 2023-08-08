import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Profile } from "../../../../pages/Discovery";
import { Box, Grid, styled } from "@mui/material";
import { ProfileDialog } from "../ProfileDialog";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <>
      <StyledCardContainer>
        <ProfileDialog profile={profile} />
        <StyledSwiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          modules={[EffectFlip, Pagination]}
          className="mySwiper"
        >
          <StyledSwiperSlide>
            <StyledImg
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              alt="profile1"
            />
            <StyledGrid container>
              <Grid item xs={10}>
                <div>{profile.userName}</div>
              </Grid>
              <Grid item xs={2}>
                <div>{profile.age}</div>
              </Grid>
            </StyledGrid>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <StyledImg
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              alt="profile2"
            />
            <StyledParagraph>{`${profile.aboutMe}`}</StyledParagraph>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <StyledImg
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="profile3"
            />
            <StyledBox>
              <StyledPersonOutlineIcon />
              <StyledSpan>{`${profile.sexualOrientation}`}</StyledSpan>
              {profile.purposes.map((purpose, index) => (
                <StyledSpan key={index}>{`${purpose.name}`}</StyledSpan>
              ))}
            </StyledBox>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <StyledImg
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="profile4"
            />
            <StyledBox>
              <StyledFavoriteBorderIcon />
              {profile.interests.map((interest, index) => (
                <StyledSpan key={index}>{`${interest.name}`}</StyledSpan>
              ))}
            </StyledBox>
          </StyledSwiperSlide>
          <StyledSwiperSlide>
            <StyledImg
              src="https://swiperjs.com/demos/images/nature-5.jpg"
              alt="profile5"
            />
          </StyledSwiperSlide>
        </StyledSwiper>
      </StyledCardContainer>
    </>
  );
};

const StyledCardContainer = styled("div")`
  position: relative;
  width: 300px;
  height: 400px;
  background-color: lightgrey;
  box-shadow: 4px 4px 6px grey;
`;

const StyledGrid = styled(Grid)`
  position: relative;
  width: 80%;
  left: 10%;
  bottom: 18%;
  color: white;
  font-size: 1.8rem;
`;

const StyledParagraph = styled("p")`
  box-sizing: border-box;
  margin: 0;
  padding: 0.5rem 1rem;
  position: relative;
  width: 100%;
  max-height: 25%;
  bottom: 25%;
  color: white;
  font-size: 1.2rem;
`;

const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  font-size: 1.7rem;
  margin-right: 0.25rem;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  font-size: 1.7rem;
  margin-right: 0.25rem;
`;

const StyledBox = styled(Box)`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  position: relative;
  width: 100%;
  bottom: 25%;
  color: white;
  max-height: 25%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  gap: 0.25rem;
`;

const StyledSpan = styled("span")`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const StyledSwiper = styled(Swiper)`
  width: 300px;
  height: 400px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  background-position: center;
  background-size: cover;
`;

const StyledImg = styled("img")`
  display: block;
  width: 300px;
  height: 400px;
`;
