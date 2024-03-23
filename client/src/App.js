import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Navbar } from "./components/common/Navbar"
import ForgotPassword from "./pages/ForgotPassword"
import { OpenRoute } from "./components/core/Auth/OpenRoute"
import { UpdatePassword } from "./pages/UpdatePassword"
import { VerifyEmail } from "./pages/VerifyEmail"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import PageNotFound from "./pages/PageNotFound"
import Dashboard from "./pages/Dashboard"
import { PrivateRoute } from "./components/core/Auth/PrivateRoute"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Cart from "./components/core/Dashboard/Cart"
import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "./utils/constants"
import AddCourse from "./components/core/Dashboard/AddCourse"
import MyCourses from "./components/core/Dashboard/MyCourses"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from "./pages/ViewCourse"

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          {" "}
        </Route>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        ></Route>
        {/* <Route path="/loader" element={<OpenRoute><Loader/></OpenRoute>}></Route> */}
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/catalog/:categoryName" element={<Catalog />}></Route>
        <Route
          path="/courses/:courseId"
          element={
            <CourseDetails
              isStudent={user?.accountType === ACCOUNT_TYPE.STUDENT}
            />
          }
        ></Route>

        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route path="/view-course/:courseId" element={<ViewCourse />}></Route>
        )}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="/dashboard/settings" element={<Settings />}></Route>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              ></Route>
              <Route
                path="/dashboard/purchase-history"
                element={<p className="text-white">history</p>}
              ></Route>
              <Route path="/dashboard/my-wishlist" element={<Cart />}></Route>
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/add-course"
                element={<AddCourse />}
              ></Route>
              <Route
                path="/dashboard/my-courses"
                element={<MyCourses />}
              ></Route>
            </>
          )}
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
