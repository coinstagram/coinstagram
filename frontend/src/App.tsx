import React, { useState, useCallback, createContext, useEffect } from 'react';
import { history } from './redux/create';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { getUserInfoSaga } from './redux/modules/userInfo';

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

interface ModalType {
  popPostModal: () => void;
  popFollowModal: () => void;
  postModal: boolean;
  followModal: boolean;
}

export const ModalContext = createContext<ModalType>({
  popPostModal() {},
  popFollowModal() {},
  postModal: false,
  followModal: false,
});

function App() {
  const dispatch = useDispatch();
  const [postModal, setPostModal] = useState<boolean>(false);
  const [followModal, setFollowModal] = useState<boolean>(false);

  const popFollowModal = useCallback(() => {
    setFollowModal(!followModal);
  }, [followModal]);

  const popPostModal = useCallback(() => {
    setPostModal(!postModal);
  }, [postModal]);

  useEffect(() => {
    dispatch(getUserInfoSaga());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!user_id) return;
  //   dispatch(getFeedPostsSaga(user_id));
  // }, [dispatch, user_id]);

  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <ModalGlobalStyle postModal={postModal} followModal={followModal} />
      <ModalContext.Provider
        value={{ popPostModal, popFollowModal, postModal, followModal }}
      >
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/explore/tags/:tagid" component={Explore} />
            <Route path="/post/:postid" component={Post} />
            <Route path="/explore" component={Explore} />
            <Route path="/upload" component={Upload} />
            <Route path="/join" component={Join} />
            <Route path="/login" component={Login} />
            <Route path="/:userid/tagged" component={Profile} />
            <Route path="/:userid/saved" component={Profile} />
            <Route path="/account/edit" component={Edit} />
            <Route path="/:userid" component={Profile} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
