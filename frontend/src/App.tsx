import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useRestoreSession } from "./features/Auth/useRestoreSession";
import ProtectedRoute from "./Component/auth/ProtectedRoute";

import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";

import CourseCalendar1 from "./Pages/CourseCalendar1";
import CourseCalendar2 from "./Pages/CourseCalendar2";
import CheckoutPage from "./Pages/CheckoutPage";
import CourseCalendarPage from "./Pages/CourseCalendarPage";
import CourseDetailPage from "./Pages/CourseDetailPage";
import CoursesPage from "./Pages/CoursesPage";
import CourseViewPage from "./Pages/CourseViewPage";
import Search from "./Pages/Search";
import MeetingPage from "./Pages/MeetingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BlogDetail from "./Pages/BlogDetail";
import MemberShip from "./Pages/MemberShip";

const App = () => {
  const { isRestoring, user } = useRestoreSession();
  if (isRestoring) {
    return <div>Checking session...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
          </Route>

          <Route path="/blog" element={<Blog />} />
          <Route path="/blogdetail" element={<BlogDetail />} />
          <Route path="/membership" element={<MemberShip />} />
          <Route path="/coursecalendar1" element={<CourseCalendar1 />} />
          <Route path="/coursecalendar2" element={<CourseCalendar2 />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/coursecalendarpage" element={<CourseCalendarPage />} />
          <Route path="/coursedetailpage" element={<CourseDetailPage />} />
          <Route path="/coursespage" element={<CoursesPage />} />
          <Route path="/courseviewpage" element={<CourseViewPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/meetingpage" element={<MeetingPage />} />
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
};

export default App;
