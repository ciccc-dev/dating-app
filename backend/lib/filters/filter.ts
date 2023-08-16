import crypto from "crypto";

export class Filter {
  private _id: string;
  private _showMe: string;
  private _minAge: number;
  private _maxAge: number;
  private _isAgeFiltered: boolean;
  private _distance: number;
  private _isDistanceFiltered: boolean;
  private _sexualOrientations: string[];
  private _isSexualOrientationFiltered: boolean;
  private _purposes: string[];
  private _isPurposeFiltered: boolean;
  private _interests: any[];
  private _isInterestFiltered: boolean;
  private _profileId: string;

  constructor({
    id,
    showMe,
    minAge,
    maxAge,
    isAgeFiltered,
    distance,
    isDistanceFiltered,
    sexualOrientations,
    isSexualOrientationFiltered,
    purposes,
    isPurposeFiltered,
    interests,
    isInterestFiltered,
    profileId,
  }: {
    id?: string;
    showMe?: any;
    minAge?: number;
    maxAge?: number;
    isAgeFiltered?: boolean;
    distance?: number;
    isDistanceFiltered?: boolean;
    sexualOrientations?: any[];
    isSexualOrientationFiltered?: boolean;
    purposes?: any[];
    isPurposeFiltered?: boolean;
    interests?: any[];
    isInterestFiltered?: boolean;
    profileId?: string;
  }) {
    this._id = id ?? crypto.randomUUID();
    this._showMe = showMe ?? "";
    this._minAge = minAge ?? 0;
    this._maxAge = maxAge ?? 100;
    this._isAgeFiltered = isAgeFiltered ?? false;
    this._distance = distance ?? 100000000;
    this._isDistanceFiltered = isDistanceFiltered ?? false;
    this._sexualOrientations = sexualOrientations ?? [];
    this._isSexualOrientationFiltered = isSexualOrientationFiltered ?? false;
    this._purposes = purposes ?? [];
    this._isPurposeFiltered = isPurposeFiltered ?? false;
    this._interests = interests ?? [];
    this._isInterestFiltered = isInterestFiltered ?? false;
    this._profileId = profileId ?? "";
  }
  id = () => this._id;
  showMe = () => this._showMe;
  minAge = () => this._minAge;
  maxAge = () => this._maxAge;
  isAgeFiltered = () => this._isAgeFiltered;
  distance = () => this._distance;
  isDistanceFiltered = () => this._isDistanceFiltered;
  purposes = () => this._purposes;
  isPurposeFiltered = () => this._isPurposeFiltered;
  interests = () => this._interests;
  isInterestFiltered = () => this._isInterestFiltered;
  profileId = () => this._profileId;

  toHash = () => {
    return {
      id: this._id,
      showMe: this._showMe,
      minAge: this._minAge,
      maxAge: this._maxAge,
      isAgeFiltered: this._isAgeFiltered,
      distance: this._distance,
      isDistanceFiltered: this._isDistanceFiltered,
      sexualOrientations: this._sexualOrientations,
      isSexualOrientationFiltered: this._isSexualOrientationFiltered,
      purposes: this._purposes,
      isPurposeFiltered: this._isPurposeFiltered,
      interests: this._interests,
      isInterestFiltered: this._isInterestFiltered,
      profileId: this._profileId,
    };
  };
}
