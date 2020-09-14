export interface followState {
  loading: boolean;
  error: null | Error;
  users: AnotherUserState[];
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

export interface imageState {
  path: string;
  name: string;
}

export interface EachCommentState {
  id: null | number;
  user_id: null | string;
  post_id: null | number;
  comment_text: null | string;
  created_at: null | string;
  parent?: null | boolean;
}

export interface CommentsState {
  loading: boolean;
  error: null | Error;
  postComments: EachCommentState[];
  myComments: EachCommentState[];
}

export interface userLikesState {
  post_id: number;
  user_id: string[];
}

export interface EachLikeState {
  loading: boolean;
  error: null | Error;
  userLikes: userLikesState[];
}

export interface likeState {
  postLikes: EachLikeState;
  commentLikes: EachLikeState;
}

export interface EachPostState {
  id: number;
  user_id: null | string;
  post_context: null | string;
  // post_images: null | string;
  // post_tags: stringArray;
  post_anotheruser: null | string;
  post_location: null | string;
  created_at: null | string;
  // comments:
  // likes:
}

export interface BookmarkState {
  loading: boolean;
  error: null | Error;
  bookmarks: number[];
}

export interface SelectedPostState {
  loading: boolean;
  error: null | Error;
  post: null | EachPostState;
}

export interface SignupState {
  loading: boolean;
  token: null | string;
  error: null | Error;
}

export interface SignupInfoState {
  user_email: null | string;
  user_name: null | string;
  user_id: null | string;
  user_password: null | string;
}

export interface AuthState {
  loading: boolean;
  token: null | string;
  error: null | Error;
}

export interface AuthInfoState {
  user_id: null | string;
  user_password: null | string;
}

export interface UserInfoState {
  loading: boolean;
  error: null | Error;
  user: null | UserState;
  followers: followState;
  followees: AnotherUserState[];
  randomUsers: followState;
}

export interface AnotherUserInfoState {
  loading: boolean;
  error: null | Error;
  user: null | UserState;
  followers: AnotherUserState[];
  followees: AnotherUserState[];
}

export interface PostsState {
  loading: boolean;
  error: null | Error;
  FeedPosts: EachPostState[];
  selectedPost: SelectedPostState;
  // taggedPosts: EachPostState[];
}

interface RootState {
  auth: AuthState;
  // signUpInfo: SignupState;
  userInfo: UserInfoState;
  anotherUserInfo: AnotherUserInfoState;
  posts: PostsState;
  comments: CommentsState;
  likes: likeState;
  bookmarks: BookmarkState;
}

export default RootState;
