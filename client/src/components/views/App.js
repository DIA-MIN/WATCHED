import '../../App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Auth from '../../hoc/auth';
import RegisterPage from './RegisterPage/RegisterPage';
import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import NavBar from './NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
