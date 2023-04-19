import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignIn from './pages/auth/SignIn';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || ""

  return (
    <div className="App">
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/signin" render={() => <SignIn />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;