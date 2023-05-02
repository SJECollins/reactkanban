import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import SignIn from './pages/auth/SignIn';
import { useCurrentUser } from './contexts/CurrentUserContext';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectPage from './pages/projects/ProjectPage';
import TaskPage from './pages/tasks/TaskPage';
import SignUp from './pages/auth/SignUp';
import TaskCreate from './pages/tasks/TaskCreate';
import TaskEdit from './pages/tasks/TaskEdit';
import ProjectCreate from './pages/projects/ProjectCreate';
import ProjectEdit from './pages/projects/ProjectEdit';

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
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/projects" render={() => <ProjectsPage />} />
          <Route exact path="/projects/create" render={() => <ProjectCreate />} />
          <Route exact path="/project/:id/edit" render={() => <ProjectEdit />} />
          <Route exact path="/project/:id" render={() => <ProjectPage />} />
          <Route exact path="/task/add/:projectId" render={() => <TaskCreate />} />
          <Route exact path="/task/:id/edit" render={() => <TaskEdit />} />
          <Route exact path="/task/:id" render={() => <TaskPage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;