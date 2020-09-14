import { call, put, select, takeEvery } from 'redux-saga/effects';
import RootState, { BookmarkState, EachPostState } from '../../type';
import BookmarkService from '../services/bookmarkService';
import PostService from '../services/postService';

// action type
const START_GET_BOOKMARKS = '/coinstagram/bookmark/START_GET_BOOKMARKS' as const;
const SUCCESS_GET_BOOKMARKS = '/coinstagram/bookmark/SUCCESS_GET_BOOKMARKS' as const;
const FAIL_GET_BOOKMARKS = '/coinstagram/bookmark/FAIL_GET_BOOKMARKS' as const;

const START_ADD_BOOKMARK = '/coinstagram/bookmark/START_ADD_BOOKMARK' as const;
const SUCCESS_ADD_BOOKMARK = '/coinstagram/bookmark/SUCCESS_ADD_BOOKMARK' as const;
const FAIL_ADD_BOOKMARK = '/coinstagram/bookmark/FAIL_ADD_BOOKMARK' as const;

const START_GET_BOOKMARK_POSTS = '/coinstagram/bookmark/START_GET_BOOKMARK_POSTS' as const;
const SUCCESS_GET_BOOKMARK_POSTS = '/coinstagram/bookmark/SUCCESS_GET_BOOKMARK_POSTS' as const;
const FAIL_GET_BOOKMARK_POSTS = '/coinstagram/bookmark/FAIL_GET_BOOKMARK_POSTS' as const;

// action creator
const startGetBookmarks = () => ({
  type: START_GET_BOOKMARKS,
});

const successGetBookmarks = (bookmarks: number[]) => ({
  type: SUCCESS_GET_BOOKMARKS,
  payload: {
    bookmarks,
  },
});

const failGetBookmarks = (error: Error) => ({
  type: FAIL_GET_BOOKMARKS,
  payload: error,
});

const startAddBookmark = () => ({
  type: START_ADD_BOOKMARK,
});

const successAddBookmark = (post_id: number) => ({
  type: SUCCESS_ADD_BOOKMARK,
  payload: {
    post_id,
  },
});

const failAddBookmark = (error: Error) => ({
  type: FAIL_ADD_BOOKMARK,
  payload: error,
});

const startGetBookmarkPosts = () => ({
  type: START_GET_BOOKMARK_POSTS,
});

const successGetBookmarkPosts = (postInfo: EachPostState) => ({
  type: SUCCESS_GET_BOOKMARK_POSTS,
  payload: {
    postInfo,
  },
});

const failGetBookmarkPosts = (error: Error) => ({
  type: FAIL_GET_BOOKMARK_POSTS,
  payload: error,
});

type BookmarkActions =
  | ReturnType<typeof startGetBookmarks>
  | ReturnType<typeof successGetBookmarks>
  | ReturnType<typeof failGetBookmarks>
  | ReturnType<typeof startAddBookmark>
  | ReturnType<typeof successAddBookmark>
  | ReturnType<typeof failAddBookmark>
  | ReturnType<typeof startGetBookmarkPosts>
  | ReturnType<typeof successGetBookmarkPosts>
  | ReturnType<typeof failGetBookmarkPosts>;

// saga action type
const GET_BOOKMARKS_SAGA = 'GET_BOOKMARKS_SAGA' as const;
const ADD_BOOKMARK_SAGA = 'ADD_BOOKMARK_SAGA' as const;
const GET_BOOKMARK_POSTS_SAGA = 'GET_BOOKMARK_POSTS_SAGA' as const;

// saga action creator
export const getBookmarksSaga = (user_id: string) => ({
  type: GET_BOOKMARKS_SAGA,
  payload: {
    user_id,
  },
});

export const addBookmarkSaga = (post_id: number) => ({
  type: ADD_BOOKMARK_SAGA,
  payload: {
    post_id,
  },
});

export const getBookmarkPostsSaga = (post_id: number) => ({
  type: GET_BOOKMARK_POSTS_SAGA,
  payload: {
    post_id,
  },
});

type GetBookmarksAction = ReturnType<typeof getBookmarksSaga>;
type AddBookmarkAction = ReturnType<typeof addBookmarkSaga>;
type GetBookmarkPostsAction = ReturnType<typeof getBookmarkPostsSaga>;

// saga function
function* getBookmarks(action: GetBookmarksAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetBookmarks());
    const bookmarkPosts = yield call(
      BookmarkService.getBookmarkedId,
      token,
      action.payload.user_id,
    );
    yield put(successGetBookmarks(bookmarkPosts));
  } catch (error) {
    yield put(failGetBookmarks(error));
  }
}

function* addBookmark(action: AddBookmarkAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startAddBookmark());
    yield call(BookmarkService.addBookmarkPost, token, action.payload.post_id);
    yield put(successAddBookmark(action.payload.post_id));
  } catch (error) {
    yield put(failAddBookmark(error));
  }
}

function* getBookmarkPosts(action: GetBookmarkPostsAction) {
  try {
    const { token } = yield select((state: RootState) => state.auth);
    yield put(startGetBookmarkPosts());
    const postInfo = yield call(
      PostService.getSpecificPost,
      token,
      action.payload.post_id,
    );
    yield put(successGetBookmarkPosts(postInfo));
  } catch (error) {
    yield put(failGetBookmarkPosts(error));
  }
}

// saga register
export function* bookmarkSaga() {
  yield takeEvery(GET_BOOKMARKS_SAGA, getBookmarks);
  yield takeEvery(ADD_BOOKMARK_SAGA, addBookmark);
  yield takeEvery(GET_BOOKMARK_POSTS_SAGA, getBookmarkPosts);
}

// initial state
const initialState: BookmarkState = {
  loading: false,
  error: null,
  bookmarks: [],
  bookmarkPosts: {
    loading: false,
    error: null,
    bookmarkPosts: [],
  },
};

// reducer
function bookmarkReducer(
  state: BookmarkState = initialState,
  action: BookmarkActions,
) {
  switch (action.type) {
    case START_GET_BOOKMARKS:
      return {
        loading: true,
        error: null,
        bookmarks: [],
        bookmarkPosts: state.bookmarkPosts,
      };
    case SUCCESS_GET_BOOKMARKS:
      return {
        loading: false,
        error: null,
        bookmarks: action.payload.bookmarks,
        bookmarkPosts: state.bookmarkPosts,
      };
    case FAIL_GET_BOOKMARKS:
      return {
        loading: false,
        error: action.payload,
        bookmarks: [],
        bookmarkPosts: state.bookmarkPosts,
      };
    case START_GET_BOOKMARK_POSTS:
      return {
        loading: false,
        error: null,
        bookmarks: state.bookmarks,
        bookmarkPosts: {
          loading: false,
          error: null,
          bookmarkPosts: null,
        },
      };
    case SUCCESS_GET_BOOKMARK_POSTS:
      return {
        loading: false,
        error: null,
        bookmarks: state.bookmarks,
        bookmarkPosts: {
          loading: false,
          error: null,
          bookmarkPosts: [
            ...state.bookmarkPosts.bookmarkPosts,
            action.payload.postInfo,
          ],
        },
      };
    case FAIL_GET_BOOKMARK_POSTS:
      return {
        loading: false,
        error: null,
        bookmarks: state.bookmarks,
        bookmarkPosts: {
          loading: false,
          error: action.payload,
          bookmarkPosts: state.bookmarkPosts.bookmarkPosts,
        },
      };
    case START_ADD_BOOKMARK:
      return {
        loading: true,
        error: null,
        bookmarks: state.bookmarks,
        bookmarkPosts: state.bookmarkPosts,
      };
    case SUCCESS_ADD_BOOKMARK:
      return {
        loading: true,
        error: null,
        bookmarks: [...state.bookmarks, action.payload.post_id],
        bookmarkPosts: state.bookmarkPosts,
      };
    case FAIL_ADD_BOOKMARK:
      return {
        loading: false,
        error: null,
        bookmarks: state.bookmarks,
        bookmarkPosts: state.bookmarkPosts,
      };
    default:
      return state;
  }
}

export default bookmarkReducer;
