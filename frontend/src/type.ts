import { Interface } from 'readline';

export interface followState {
  loading: boolean;
  error: null | Error;
  users: AnotherUserState[];
}

export interface CountState {
  loading: boolean;
  error: null | Error;
  counts: CountReduxState[];
}

export interface CountReduxState {
  post_id: number;
  commentCount: number;
  likeCount: number;
}

export interface CountResponseState {
  commentCount: number;
  likeCount: number;
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
  image_path: string;
  image_name: string;
  image_type: string;
}

export interface EachCommentState {
  id: null | number;
  user_id: null | string;
  user_profile: null | string;
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
  feedPostLikes: EachLikeState;
  selectedPostLikes: EachLikeState;
  // feedCommentLikes: EachLikeState;
  // selectedCommentLikes: EachLikeState;
}

export interface EachPostState {
  id: number;
  user_id: null | string;
  post_context: null | string;
  image_path: string[];
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
  bookmarkPosts: BookmarkPostsState;
}

export interface BookmarkPostsState {
  loading: boolean;
  error: null | Error;
  bookmarkPosts: EachPostState[];
}

export interface SelectedPostState {
  loading: boolean;
  error: null | Error;
  selectedPost: null | EachPostState;
}

export interface RandomPostsState {
  loading: boolean;
  error: null | Error;
  randomPosts: EachPostState[];
}

export interface FeedPostsState {
  loading: boolean;
  error: null | Error;
  feedPosts: EachPostState[];
}

export interface SignupState {
  loading: boolean;
  error: null | Error;
}

export interface SignupInfoState {
  user_email: null | string;
  user_name: null | string;
  user_id: null | string;
  user_password: null | string;
}

export interface PostData {
  id: String;
  user_id: String;
  post_context: String;
  post_anotheruser: String;
  post_location: String;
  created_at: String;
  tag: Array<String>;
  image_path: Array<Object>;
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
  feedPosts: FeedPostsState;
  selectedPost: SelectedPostState;
  randomPosts: RandomPostsState;
  // taggedPosts: EachPostState[];
}

export interface uploadState {
  Loading: boolean;
  Done: boolean;
  Error: Error;
  data: PostData;
}

export interface OtherPostState {
  loading: boolean;
  error: null | Error;
  otherPosts: EachPostState[];
  counts: CountState;
}

interface RootState {
  auth: AuthState;
  userInfo: UserInfoState;
  anotherUserInfo: AnotherUserInfoState;
  posts: PostsState;
  upload: uploadState;
  comments: CommentsState;
  likes: likeState;
  bookmarks: BookmarkState;
  otherPosts: OtherPostState;
}

export default RootState;
