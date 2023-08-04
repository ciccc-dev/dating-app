export class Filter {
  private id: string;
  private showMe: string;
  private minAge?: number;
  private maxAge?: number;
  private isAgeFiltered?: boolean;
  private distance?: number;
  private isDistanceFiltered?: boolean;
  // sexualOrientations?: FilterCreatesexualOrientationsInput | Enumerable<string>;
  private sexualOrientations?: string[];
  private isSexualOrientationFiltered?: boolean;
  // purposes?: FilterCreatepurposesInput | Enumerable<string>;
  private purposes?: string[];
  private isPurposeFiltered?: boolean;
  private interests?: string[];
  private isInterestFiltered?: boolean;
  // profile: ProfileCreateNestedOneWithoutFilterInput;
  private profile_id: string;
  // interests?: InterestCreateNestedManyWithoutFiltersInput;

  constructor(obj: any) {
    this.id = obj.id;
    this.showMe = obj.showMe;
    this.minAge = obj.minAge ?? 0;
    this.maxAge = obj.maxAge ?? 100;
    this.isAgeFiltered = obj.isAgeFiltered;
    this.distance = obj.distance ?? 100000000;
    this.isDistanceFiltered = obj.isDistanceFiltered;
    this.sexualOrientations = obj.sexualOrientations;
    this.isSexualOrientationFiltered = obj.isSexualOrientationFiltered;
    this.purposes = obj.purposes ?? [];
    this.isPurposeFiltered = obj.isPurposeFiltered;
    this.interests = obj.interests ?? [];
    this.isInterestFiltered = obj.isInterestFiltered;
    this.profile_id = obj.profile.id;
  }
}
