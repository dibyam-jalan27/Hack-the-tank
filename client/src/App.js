import "./App.css";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import Review from "./components/Review";
import { Toaster } from "react-hot-toast";
import CourseDetails from "./components/CourseDetails";
import CommunityForum from "./components/CommunityForum";
import NavBar from "./components/NavBar";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/review" element={<Review />}></Route>
          <Route path="/course-details" element={<CourseDetails />}></Route>
          <Route path="/community-forum" element={<CommunityForum />}></Route>
          <Route path="/navbar" element={<NavBar/>} ></Route>
          <Route path="/chat-window" element={<chatWindow />}></Route>
          
          <Route path="/footer" element={<Footer />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
