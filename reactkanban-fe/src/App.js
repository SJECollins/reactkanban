import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignIn from './pages/auth/SignIn';
import { useCurrentUser } from './contexts/CurrentUserContext';
import ProjectsPage from './pages/projects/ProjectsPage';

function App() {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || ""

  return (
    <div className="App">
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <ProjectsPage />} />
          <Route exact path="/signin" render={() => <SignIn />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;