import './App.css';
import Login from './components/Login';
import Forgot from './components/Forgot';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
    </Routes>
</BrowserRouter>
  );
}

export default App;
