import React from 'react';
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

function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/explore/tags/:tagid" component={Explore} />
          <Route path="/explore" component={Explore} />
          <Route path="/account/:userid/tagged" component={Profile} />
          <Route path="/account/:userid/saved" component={Profile} />
          <Route path="/account/:userid" component={Profile} />
          <Route path="/post/:postid" component={Post} />
          <Route path="/upload" component={Upload} />
          <Route path="/edit" component={Edit} />
          <Route path="/join" component={Join} />
          <Route path="/" exact render={() => <Home />} />
          <Route component={NotFound} />
          <Route />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
