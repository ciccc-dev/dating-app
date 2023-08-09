import crypto from "crypto";
import parseISO from "date-fns/parseISO";

import { Gender, GENDER } from "../../constants";
import { SexualOrientation } from "../../constants";

export class Profile {
  private _id: string;
  private _username: string;
  private _gender?: Gender;
  private _birthday: Date;
  // private _sexualOrientation?: SexualOrientation;
  private _sexualOrientation?: string;
  private _aboutMe: string;

  constructor({
    id,
    username,
    gender,
    birthday,
    sexualOrientation,
    aboutMe,
  }: {
    id: string | undefined;
    username: string;
    gender: Gender | undefined;
    birthday: string;
    // sexualOrientation: SexualOrientation | undefined;
    sexualOrientation: string;
    aboutMe: string;
  }) {
    if (gender && !Object.values(GENDER).includes(gender))
      throw "Gender is invalida";

    this._id = id ?? crypto.randomUUID();
    this._username = username;
    this._gender = gender;
    this._birthday = parseISO(birthday);
    this._sexualOrientation = sexualOrientation;
    this._aboutMe = aboutMe ?? "";
  }

  id = () => this._id;
  username = () => this._username;
  gender = () => this._gender;
  birthday = () => this._birthday;
  sexualOrientation = () => this._sexualOrientation;
  aboutMe = () => this._aboutMe;
}
