import { AxiosError } from 'axios';

export interface imageState {
  path: string;
  name: string;
}

export interface AnotherUserState {
  id: null | string;
  name: null | string;
  profile: null | string;
}

export interface UserInfoState {
  id: null | number;
  name: null | string;
  email: null | string;
  gender: null | string;
  introduce: null | string;
  phone: null | number;
  profile: null | string;
  followers: null | AnotherUserState;
  followees: null | AnotherUserState;
}

export type stringArray = string[];

export interface commentState {
  id: null | string;
  comment_text: null | string;
  createdAt: null | string;
  likes: null | stringArray;
  replied?: null | commentState;
}

export interface PostState {
  id: null | string;
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
  error: null | AxiosError;
}

export interface UserState {
  loading: boolean;
  error: null | AxiosError;
  userInfo: null | UserInfoState;
}

export interface PostsState {
  FeedPosts: PostState;
  bookmarkPosts: PostState;
  taggedPosts: PostState;
}

interface RootState {
  auth: AuthState;
  user: UserState;
  // 다른 reducer의 상태 추가 필요
}

export default RootState;
