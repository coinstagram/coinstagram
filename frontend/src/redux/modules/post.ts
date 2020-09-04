import { PostState, PostsState } from '../../type';
import { AxiosError } from 'axios';

// action type
const START_GET_POST = 'coinstagram/post/START_GET_POST' as const;
const SUCCESS_GET_POST_USER = 'coinstagram/post/SUCCESS_GET_POST_USER' as const;
const SUCCESS_GET_POST_RANDOM = 'coinstagram/post/SUCCESS_GET_POST_RANDOM' as const;
const FAIL_GET_POST = 'coinstagram/post/FAIL_GET_POST' as const;

// action creator
const startGetPost = () => ({
  type: START_GET_POST,
});

const successGetPostUser = (userPosts: PostsState) => ({
  type: SUCCESS_GET_POST_USER,
  payload: userPosts,
});

const successGetPostRandom = (randomPosts: PostState) => ({
  type: SUCCESS_GET_POST_RANDOM,
  payload: randomPosts,
});

const failGetPost = (error: AxiosError) => ({
  type: FAIL_GET_POST,
  payload: error,
});

type PostActions =
  | ReturnType<typeof startGetPost>
  | ReturnType<typeof successGetPostUser>
  | ReturnType<typeof successGetPostRandom>
  | ReturnType<typeof failGetPost>;

// saga function

// saga function register

// initial state

// reducer
