import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Profile } from "../../../../pages/Discovery";
import { styled } from "@mui/material";
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
            <StyleTitle>{`${profile.userName}  ${profile.birthday}`}</StyleTitle>
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
            <StyleTitle>{`${profile.aboutMe}`}</StyleTitle>
          </StyleSwiperSlide>
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="profile4"
            />
            <StyleTitle>{`${profile.aboutMe}`}</StyleTitle>
          </StyleSwiperSlide>
          <StyleSwiperSlide>
            <StyleImg
              src="https://swiperjs.com/demos/images/nature-5.jpg"
              alt="profile5"
            />
            <StyleTitle>{`${profile.aboutMe}`}</StyleTitle>
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
`;

const StyleTitle = styled("h5")`
  position: relative;
  width: 80%;
  left: 10%;
  bottom: 30%;
  color: white;
  font-size: 1rem;
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
