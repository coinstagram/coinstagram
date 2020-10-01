import React, { useState, useCallback, createContext } from 'react';
import { history } from './redux/create';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { cancelFollowUserSaga, followUserSaga } from './redux/modules/userInfo';
import useInit from './hooks/useInit';

// styles
import ModalGlobalStyle from './components/common/ModalGlobalStyle';

// pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Join from './pages/Join';
import Login from './pages/Login';
import Edit from './pages/Edit';
import Post from './pages/Post';
import Upload from './pages/Upload';
import Explore from './pages/Explore';
import FatalError from './pages/FatalError';
import NotFound from './pages/NotFound';

// components
import FollowCancelModal from './components/common/FollowCancelModal';
import ChangePost from './pages/ChangePost';

interface contextValue {
  follow: (user_id: string, user_name: string, user_profile: null | string) => void;
  setFollowInfo: (user_id: string, user_profile: null | string, targetEl: null | HTMLSpanElement) => void;
  changePostId: (post_id: number) => void;
  user_id: string;
}

export const followContext = createContext<null | contextValue>(null);

interface ModalType {
  popPostModal: () => void;
  popFollowModal: () => void;
  postModal: boolean;
  followModal: boolean;
  postId: number;
  user_id: string;
  user_profile: null | string;
  follow: (user_id: string, user_name: string, user_profile: null | string) => void;
}

export interface ModalState {
  user_id: string;
  user_profile: null | string;
  targetEl: null | HTMLSpanElement;
}

export const ModalContext = createContext<ModalType>({
  popPostModal() {},
  popFollowModal() {},
  follow() {},
  postModal: false,
  followModal: false,
  postId: 0,
  user_id: '',
  user_profile: null,
});

function App() {
  const dispatch = useDispatch();
  const [postModal, setPostModal] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);
  const [followModal, setFollowModal] = useState<boolean>(false);
  const [followModalState, setFollowModalState] = useState<ModalState>({
    user_id: '',
    user_profile: null,
    targetEl: null,
  });

  const { user_id, user_profile, targetEl } = followModalState;

  useInit();

  const changePostId = useCallback((post_id: number) => {
    setPostId(post_id);
  }, []);

  const popFollowModal = useCallback(() => {
    setFollowModal(!followModal);
  }, [followModal]);

  const popPostModal = useCallback(() => {
    setPostModal(!postModal);
  }, [postModal]);

  const follow = useCallback(
    (user_id: string, user_name: string, user_profile: null | string) => {
      dispatch(followUserSaga(user_id, user_name, user_profile));
    },
    [dispatch],
  );

  const cancelFollow = useCallback(() => {
    dispatch(cancelFollowUserSaga(user_id));
  }, [dispatch, user_id]);

  const setFollowInfo = useCallback((user_id: string, user_profile: null | string, targetEl: null | HTMLSpanElement) => {
    setFollowModalState({
      user_id,
      user_profile,
      targetEl,
    });
  }, []);

  const value = {
    follow,
    setFollowInfo,
    changePostId,
    user_id,
  };

  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <ModalGlobalStyle postModal={postModal} followModal={followModal} />
      <ModalContext.Provider
        value={{
          popPostModal,
          popFollowModal,
          follow,
          postModal,
          followModal,
          postId,
          user_id,
          user_profile,
        }}
      >
        <followContext.Provider value={value}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/explore/tags/:tagid" component={Explore} />
              <Route path="/post/:postid" component={Post} />
              <Route path="/explore" component={Explore} />
              <Route path="/upload" component={Upload} />
              <Route path="/change/:post_id" component={ChangePost} />
              <Route path="/join" component={Join} />
              <Route path="/login" component={Login} />
              <Route path="/account/:userid/tagged" component={Profile} />
              <Route path="/account/:userid/saved" component={Profile} />
              <Route path="/account/:userid" component={Profile} />
              <Route path="/edit" component={Edit} />
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
        </followContext.Provider>
      </ModalContext.Provider>
      {followModal && (
        <FollowCancelModal
          user_id={user_id}
          user_profile={user_profile}
          targetEl={targetEl ? targetEl : undefined}
          cancelFollow={cancelFollow}
          popFollowModal={popFollowModal}
        />
      )}
    </ErrorBoundary>
  );
}

export default App;
