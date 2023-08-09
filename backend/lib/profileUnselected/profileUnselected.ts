import crypto from "crypto";

export class ProfileUnselected {
  private unselectedBy: string;
  private unselectedProfile: string;
  private id: string;
  private registeredAt: Date;

  constructor(
    unselectedBy: string,
    unselectedProfile: string,
    id: string = crypto.randomUUID(),
    registeredAt: Date = new Date()
  ) {
    this.unselectedBy = unselectedBy;
    this.unselectedProfile = unselectedProfile;
    this.id = id;
    this.registeredAt = registeredAt;
  }

  toHash = () => ({
    unselectedBy: this.unselectedBy,
    unselectedProfile: this.unselectedProfile,
    id: this.id,
    registeredAt: this.registeredAt,
  });
}
