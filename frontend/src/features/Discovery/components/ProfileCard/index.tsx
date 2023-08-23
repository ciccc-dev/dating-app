import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Profile } from "../../../../pages/Discovery";
import { styled } from "@mui/material";
import { ProfileDialog } from "../ProfileDialog";
import unknowUser from "../../../../pic/unkown_user.png";
import { ProfileDetail } from "./ProfileDetail";

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
          {profile.photos.length === 0 ? (
            <StyledSwiperSlide>
              <StyledImg src={unknowUser} alt="unknowUser" />
              <ProfileDetail profile={profile} index={0} />
            </StyledSwiperSlide>
          ) : (
            profile.photos.map((item, index) => (
              <StyledSwiperSlide key={index}>
                <StyledImg src={item.photoUrl} alt={item.photoUrl} />
                <ProfileDetail profile={profile} index={index} />
              </StyledSwiperSlide>
            ))
          )}
        </StyledSwiper>
      </StyledCardContainer>
    </>
  );
};

const StyledCardContainer = styled("div")`
  position: relative;
  border-radius: 1.2rem;
  width: 300px;
  height: 400px;
  background-color: lightgrey;
  box-shadow: 4px 4px 6px grey;
`;

const StyledSwiper = styled(Swiper)`
  width: 300px;
  height: 400px;
  border-radius: 1.2rem;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  background-position: center;
  background-size: cover;
`;

const StyledImg = styled("img")`
  display: block;
  width: 300px;
  height: 400px;
  border-radius: 1.2rem;
`;
