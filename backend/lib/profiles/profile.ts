import { Gender, GENDER } from "../../constants";
import { SexualOrientation } from "../../constants";

export class Profile {
  private _username: string;
  private _gender?: Gender;
  private _birthday: Date;
  private _sexualOrientation?: SexualOrientation;
  private _aboutMe: string;

  constructor({
    username,
    gender,
    birthday,
    sexualOrientation,
    aboutMe,
  }: {
    username: string;
    gender: Gender | undefined;
    birthday: Date;
    sexualOrientation: SexualOrientation | undefined;
    aboutMe: string;
  }) {
    if (gender && !Object.values(GENDER).includes(gender))
      throw "Gender is invalida";

    this._username = username;
    this._gender = gender;
    this._birthday = birthday;
    this._sexualOrientation = sexualOrientation;
    this._aboutMe = aboutMe ?? "";
  }

  username = () => this._username;
  gender = () => this._gender;
  birthday = () => this._birthday;
  sexualOrientation = () => this._sexualOrientation;
  aboutMe = () => this._aboutMe;
}
