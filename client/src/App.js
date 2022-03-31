import './App.css';
import { 
  BrowserRouter as Router,
  Routes, 
  Route 
} from "react-router-dom";
import Login from './components/Page Components/Login/Login';
import SignUp from './components/Page Components/SignUp/SignUp';
import Home from './components/Page Components/Home/Home';
import Newsfeed from './components/Page Components/Newsfeed/Newsfeed';
import Settings from './components/Page Components/Settings/Settings';
import NewList from './components/Page Components/NewList/NewList';
import Invitations from './components/Page Components/Invitations/Invitations';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {/* Protected Routes */}
          <Route path="/newsfeed" element={<ProtectedRoute>
            <Newsfeed />
          </ProtectedRoute>}></Route>
          <Route path="/newlist" element={<ProtectedRoute>
            <NewList />
          </ProtectedRoute>}></Route>
          <Route path="/home" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>}></Route>
          <Route path="/invitations" element={<ProtectedRoute>
            <Invitations />
          </ProtectedRoute>}></Route>
          <Route path="/settings" element={<ProtectedRoute>
            <Settings />
          </ProtectedRoute>}></Route>
        </Routes>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;
