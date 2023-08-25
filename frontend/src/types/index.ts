export interface Item {
  name: string;
}

export interface Photo {
  id: string;
  photoUrl: string;
}

export interface Profile {
  id: string;
  userId: string;
  userName: string;
  age: number;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
  purposes: Item[];
  interests: Item[];
  photos: Photo[];
  distance: number;
}
