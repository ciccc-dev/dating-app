export interface Message {
  id: string;
  sentBy: string;
  receivedBy: string;
  message: string;
  hasRead: boolean;
  timestamp: string;
  sender: Profile;
  receiver: Profile;
}

export interface Profile {
  userId: string;
  userName: string;
}
