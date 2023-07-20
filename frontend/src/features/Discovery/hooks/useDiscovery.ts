import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { ProfileClient } from "../../Discovery/api/profile";

interface Profile {
  id: UUID;
  userId: string;
  userName: string;
  birthday: Date;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
}

export const useDiscovery = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    //   FilterClient.getFilters();
    const getProfiles = ProfileClient.getProfiles();
  }, []);
};
