import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

import { navigationWidth } from "../constants/navigation";
import { LikesNavigation } from "../features/Likes/components/Navigation";
import { LikePartnersTable } from "../features/Likes/components/Table";
import {
  UseFetchLinkedProfilesResponse,
  useFetchLikedProfiles,
} from "../hooks/useFetchLikedProfiles";
import { Typography } from "@mui/material";

interface State {
  category: string;
}

export const Likes = () => {
  const [state, update] = useState<State>({ category: "SENT" });
  const { sentTo, receivedFrom, matched }: UseFetchLinkedProfilesResponse =
    useFetchLikedProfiles();

  const profiles = useMemo(() => {
    if (state.category === "SENT") return sentTo;
    if (state.category === "RECEIVED") return receivedFrom;
    return matched;
  }, [matched, receivedFrom, sentTo, state.category]);

  const handleChangeCategory = (e: any) =>
    update(() => ({
      category: e.currentTarget.dataset.item as string,
    }));

  return (
    <StyledWrapper>
      <StyledNavigationWrapper>
        <LikesNavigation onClick={handleChangeCategory} />
      </StyledNavigationWrapper>
      <StyledContent>
        <Typography variant="h5">{state.category}</Typography>
        <LikePartnersTable profiles={profiles} />
      </StyledContent>
    </StyledWrapper>
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
  flex-grow: 1;
  padding: 3px;
  width: calc(100% - ${navigationWidth}px);

  @media (max-width: 600px) {
    width: 100%;
  }
`;
