export interface SerializedUser {
  id: string;
  emailAddress: string;
  userName?: string | null;
  imageUrl?: string | null;
}

export interface IAvatar {
  id: string;
  avatarId: number;
  get_image: string;
}