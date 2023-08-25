import crypto from "crypto";
import parseISO from "date-fns/parseISO";

import { Gender, GENDER } from "../../constants";

export class Profile {
  private _id: string;
  private _username: string;
  private _gender?: Gender;
  private _birthday: Date;
  private _sexualOrientation?: string;
  private _aboutMe: string;
  private _interests: { id: number; name: string }[];

  constructor({
    id,
    username,
    gender,
    birthday,
    sexualOrientation,
    aboutMe,
    interests,
  }: {
    id: string | undefined;
    username: string;
    gender: Gender | undefined;
    birthday: string;
    sexualOrientation: string;
    aboutMe: string;
    interests: { id: number; name: string }[];
  }) {
    if (gender && !Object.values(GENDER).includes(gender))
      throw "Gender is invalida";

    this._id = id ?? crypto.randomUUID();
    this._username = username;
    this._gender = gender;
    this._birthday = parseISO(birthday);
    this._sexualOrientation = sexualOrientation;
    this._aboutMe = aboutMe ?? "";
    this._interests = interests ?? [];
  }

  id = () => this._id;
  username = () => this._username;
  gender = () => this._gender;
  birthday = () => this._birthday;
  sexualOrientation = () => this._sexualOrientation;
  aboutMe = () => this._aboutMe;
  interests = () => this._interests;
}
