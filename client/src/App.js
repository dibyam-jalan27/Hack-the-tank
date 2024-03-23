import './App.css';
import Login from './components/Login';
import Forgot from './components/Forgot';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Review from './components/Review';
import CourseDetails from './components/CourseDetails';
function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path='/review' element={<Review/>}></Route>
      <Route path='/course-details' element={<CourseDetails/>}></Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
