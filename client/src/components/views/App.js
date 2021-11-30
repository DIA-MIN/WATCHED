import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from '../../hoc/auth';
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
      <Suspense
        fallback={
          <div
            style={{
              height: '100vh',
              background: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fdd835',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Loading WATCHED
          </div>
        }
      >
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
