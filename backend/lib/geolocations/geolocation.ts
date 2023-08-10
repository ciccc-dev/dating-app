import crypto from "crypto";

export class ProfileGeolocation {
  private profileId: string;
  private location: string;
  private latitude: string;
  private longtitude: string;
  private id: string;

  constructor(
    profileId: string,
    location: string,
    latitude: string,
    longtitude: string,
    id: string = crypto.randomUUID()
  ) {
    this.profileId = profileId;
    this.location = location;
    this.latitude = latitude;
    this.longtitude = longtitude;
    this.id = id;
  }

  toHash = () => ({
    profileId: this.profileId,
    location: this.location,
    latitude: this.latitude,
    longtitude: this.longtitude,
    id: this.id,
  });
}
