export interface followState {
  loading: boolean;
  error: null | Error;
  users: AnotherUserState[];
}

export interface imageState {
  path: string;
  name: string;
}

export interface UserResponseState {
  user: UserState;
  follower: AnotherUserState[];
  followee: AnotherUserState[];
}

export interface AnotherUserState {
  user_id: null | string;
  user_name: null | string;
  user_profile: null | string;
}

export interface UserState {
  user_id: null | string;
  user_name: null | string;
  user_email: null | string;
  user_gender: null | string;
  user_introduce: null | string;
  user_phone: null | number;
  user_profile: null | string;
  iat?: number;
  exp?: number;
}

export type stringArray = string[];

export interface commentState {
  comment_id: null | string;
  comment_text: null | string;
  createdAt: null | string;
  likes: null | stringArray;
  replied?: null | commentState;
}

export interface PostState {
  post_id: null | string;
  user_id: null | string;
  post_images: null | string;
  post_title: null | string;
  post_tags: stringArray;
  post_anotherUsers: stringArray;
  post_locations: stringArray;
  created_at: null | string;
  likes: null | stringArray;
  comments: null | commentState;
}

export interface AuthState {
  loading: boolean;
  token: null | string;
  error: null | Error;
}

export interface SignupState {
  loading: boolean;
  token: null | string;
  error: null | Error;
}

export interface UserInfoState {
  loading: boolean;
  error: null | Error;
  user: null | UserState;
  followers: followState;
  followees: AnotherUserState[];
  randomUsers: AnotherUserState[];
}

export interface AnotehrUserInfoState {
  loading: boolean;
  error: null | Error;
  user: null | UserState;
}

export interface PostsState {
  FeedPosts: PostState;
  bookmarkPosts: PostState;
  taggedPosts: PostState;
}

interface RootState {
  auth: AuthState;
  userInfo: UserInfoState;
  anotherUserInfo: AnotehrUserInfoState;
}

export default RootState;
