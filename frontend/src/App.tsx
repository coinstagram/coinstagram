import React, { useState, useCallback, createContext } from 'react';
import { history } from './redux/create';
import { Switch, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Join from './pages/Join';
import Edit from './pages/Edit';
import Post from './pages/Post';
import Upload from './pages/Upload';
import Explore from './pages/Explore';
import FatalError from './pages/FatalError';
import NotFound from './pages/NotFound';
import ModalGlobalStyle from './styles/ModalGlobalStyle';
import { ErrorBoundary } from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';

interface ModalType {
  popPostModal: () => void;
  popFollowModal: () => void;
  followModal: boolean;
}

export const ModalContext = createContext<ModalType>({
  popPostModal() {},
  popFollowModal() {},
  followModal: false,
});

function App() {
  const [postModal, setPostModal] = useState<boolean>(false);
  const [followModal, setFollowModal] = useState<boolean>(false);

  const popFollowModal = useCallback(() => {
    setFollowModal(!followModal);
  }, [followModal]);

  const popPostModal = useCallback(() => {
    setPostModal(!postModal);
  }, [postModal]);

  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <ModalGlobalStyle postModal={postModal} followModal={followModal} />
      <ModalContext.Provider
        value={{ popPostModal, popFollowModal, followModal }}
      >
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/explore/tags/:tagid" component={Explore} />
            <Route path="/post/:postid" component={Post} />
            <Route path="/explore" component={Explore} />
            <Route path="/upload" component={Upload} />
            <Route path="/join" component={Join} />
            <Route path="/account/:userid/tagged" component={Profile} />
            <Route path="/account/:userid/saved" component={Profile} />
            <Route path="/account/edit" component={Edit} />
            <Route path="/:userid" component={Profile} />
            <Route
              path="/"
              exact
              render={() => (
                <Home postModal={postModal} popPostModal={popPostModal} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
