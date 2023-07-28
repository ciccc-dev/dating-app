import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Profile } from "../../../../pages/Discovery";
import { Grid, styled } from "@mui/material";
import { ProfileDialog } from "../ProfileDialog";

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <>
      <StyleCardContainer>
        <ProfileDialog profile={profile} />
        <StyleSwiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          modules={[EffectFlip, Pagination]}
          className="mySwiper"
        >
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              alt="profile1"
            />
            <StyleGrid container>
              <Grid item xs={10}>
                <div>{profile.userName}</div>
              </Grid>
              <Grid item xs={2}>
                <div>{profile.age}</div>
              </Grid>
            </StyleGrid>
          </StyleSwiperSlide>
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              alt="profile2"
            />
            <StyleTitle>{`${profile.aboutMe}`}</StyleTitle>
          </StyleSwiperSlide>
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="profile3"
            />
            <StyleSpan>{`${profile.sexualOrientation}`}</StyleSpan>
            {profile.purposes.map((purpose, index) => (
              <StyleSpan key={index}>{`${purpose.name}`}</StyleSpan>
            ))}
          </StyleSwiperSlide>
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="profile4"
            />
            {profile.interests.map((interest, index) => (
              <StyleSpan key={index}>{`${interest.name}`}</StyleSpan>
            ))}
          </StyleSwiperSlide>
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-5.jpg"
              alt="profile5"
            />
          </StyleSwiperSlide>
        </StyleSwiper>
      </StyleCardContainer>
    </>
  );
};

const StyleCardContainer = styled("div")`
  position: relative;
  width: 300px;
  height: 400px;
  background-color: lightgrey;
`;

const StyleGrid = styled(Grid)`
  position: relative;
  width: 80%;
  left: 10%;
  bottom: 18%;
  color: white;
  font-size: 1.8rem;
`;

const StyleTitle = styled("h5")`
  position: relative;
  width: 80%;
  left: 10%;
  bottom: 30%;
  color: white;
  font-size: 1.2rem;
`;

const StyleSpan = styled("span")`
  position: relative;
  left: 5%;
  bottom: 18%;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const StyleSwiper = styled(Swiper)`
  width: 300px;
  height: 400px;
`;

const StyleSwiperSlide = styled(SwiperSlide)`
  background-position: center;
  background-size: cover;
`;

const StyleImg = styled("img")`
  display: block;
  width: 300px;
  height: 400px;
`;
