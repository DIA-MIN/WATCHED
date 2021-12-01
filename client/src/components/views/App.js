import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from '../../hoc/auth';
import Loader from './commons/Loader';
const RegisterPage = lazy(() => import('./RegisterPage/RegisterPage'));
const LandingPage = lazy(() => import('./LandingPage/LandingPage'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const NavBar = lazy(() => import('./NavBar/NavBar'));
const MovieDetailPage = lazy(() => import('./MovieDetailPage/MovieDetailPage'));
const SearchResultPage = lazy(() =>
  import('./SearchResultPage/SearchResultPage')
);
const MyPickPage = lazy(() => import('./MyPickPage/MyPickPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/movie/:movieId"
              component={Auth(MovieDetailPage, null)}
            />
            <Route
              exact
              path="/search"
              component={Auth(SearchResultPage, null)}
            />
            <Route exact path="/mypick" component={Auth(MyPickPage, true)} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
