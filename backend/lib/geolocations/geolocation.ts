import crypto from "crypto";

export class ProfileGeolocation {
  private profileId: string;
  private location: string;
  private latitude: string;
  private longitude: string;
  private id: string;

  constructor(
    profileId: string,
    location: string,
    latitude: string,
    longitude: string,
    id: string = crypto.randomUUID()
  ) {
    this.profileId = profileId;
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
    this.id = id;
  }

  toHash = () => ({
    profileId: this.profileId,
    location: this.location,
    latitude: this.latitude,
    longitude: this.longitude,
    id: this.id,
  });
}
