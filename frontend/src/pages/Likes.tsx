import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

import { navigationWidth } from "../constants/navigation";
import { LikesNavigation } from "../features/Likes/components/Navigation";
import {
  ReceivedLikesTable,
  SentLikesTable,
} from "../features/Likes/components/Table";
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
    update(() => ({ category: e.currentTarget.dataset.item as string }));

  return (
    <StyledWrapper>
      <StyledNavigationWrapper>
        <LikesNavigation onClick={handleChangeCategory} />
      </StyledNavigationWrapper>
      <StyledContent>
        <StyleTableTitle variant='h5'>{`${state.category} LIKES`}</StyleTableTitle>
        {state.category === "SENT" && <SentLikesTable profiles={profiles} />}
        {state.category === "RECEIVED" && (
          <ReceivedLikesTable profiles={profiles} />
        )}
        {state.category === "MATCHED" && <SentLikesTable profiles={profiles} />}
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  display: flex;
  background-color: #f5f5f5;
  height: 100vh;
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
    width: 956%;
  }
`;

const StyleTableTitle = styled(Typography)`
  margin-top: 20px;
  margin-left: 20px;
`;
