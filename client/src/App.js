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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/newsfeed" element={<Newsfeed />}></Route>
        <Route path="/newlist" element={<NewList />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/invitations" element={<Invitations />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
