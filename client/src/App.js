import './App.css';
import Login from './components/Login';
import Forgot from './components/Forgot';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path='/review' element={<Review/>}></Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
