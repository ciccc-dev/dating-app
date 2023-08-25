import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { _photoClient } from "../features/Discovery/api/photo";
import { Photo, Profile } from "../types";

export interface LikedList {
  sentTo: string[];
  receivedFrom: string[];
  matched: string[];
}
export interface LikedListProfile {
  sentTo: Profile[];
  receivedFrom: Profile[];
  matched: Profile[];
}

export interface useFetchLikedListResponse {
  urlSentTo: ProfilePhotos[];
  urlReceivedFrom: ProfilePhotos[];
  urlMatched: ProfilePhotos[];
}

export interface ProfilePhotos {
  profileId: string;
  photos: Photo;
}

const initialValue = {
  urlSentTo: [],
  urlReceivedFrom: [],
  urlMatched: [],
};

export const useFetchPhotosList = (
  LikedListProfile: LikedListProfile
): useFetchLikedListResponse => {
  const { getAccessTokenSilently } = useAuth0();
  const [profilePhotos, setProfilePhotos] =
    useState<useFetchLikedListResponse>(initialValue);
  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const PhotoClient = new _photoClient(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        const likedList: LikedList = {
          sentTo: LikedListProfile.sentTo.map((profile) => profile.id),
          receivedFrom: LikedListProfile.receivedFrom.map(
            (profile) => profile.id
          ),
          matched: LikedListProfile.matched.map((profile) => profile.id),
        };
        const photosList = await PhotoClient.fetchLikedListPhotos(likedList);
        setProfilePhotos(photosList);
      }
    })();
  }, [
    LikedListProfile.matched,
    LikedListProfile.receivedFrom,
    LikedListProfile.sentTo,
    getAccessTokenSilently,
  ]);

  return profilePhotos;
};
