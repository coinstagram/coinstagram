import React, { useState, useCallback, createContext } from 'react';
import { history } from './redux/create';
import { ErrorBoundary } from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';
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

interface ModalType {
  modal: boolean;
  popModal: () => void;
}

export const ModalContext = createContext<ModalType>({
  modal: false,
  popModal() {},
});

function App() {
  const [modal, setModal] = useState<boolean>(false);

  const popModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <ModalGlobalStyle modal={modal} />
      <ModalContext.Provider value={{ modal, popModal }}>
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
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
