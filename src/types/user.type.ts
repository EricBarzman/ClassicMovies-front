export interface IAvatar {
  id: string;
  avatarId: number;
  get_image: string;
}

export interface ISerializedUser {
  id: string;
  email: string;
  username: string;
  firebaseId: string;
  avatar: IAvatar
}

export interface IVote {
  id: string;
  userId: string;
  movieId: string;
  value: number;
}