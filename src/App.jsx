import { Route, Routes, useParams, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Layout from "./pages/Layout";
import { useDispatch } from "react-redux";
import api from "./config/api";
import { login, setLoading } from "./app/features/authSlice";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import i18next from "i18next";
import { Navigate } from "react-router-dom";
import Templates from "./pages/Templates";
import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import PublicRoute from "./routes/PublicRoute";

function LanguageWrapper() {
  const { lang } = useParams();
  const allowedLangs = ["en", "kh"];

  useEffect(() => {
    if (allowedLangs.includes(lang)) {
      i18next.changeLanguage(lang);
    }
  }, [lang, allowedLangs]);

  // Redirect happens here, NOT before hooks
  if (!allowedLangs.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
}



function App() {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const { data } = await api.get('/api/users/data', { headers: { Authorization: token } });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Toaster />

      <Routes>
        {/* Auto redirect root to English */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Wrap ALL multilingual routes here */}
        <Route path="/:lang" element={<LanguageWrapper />}>

          {/* Home and Template Pages wrapped in HomeLayout to show Header */}
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="templates" element={<Templates />} />

          </Route>

          <Route element={<ProtectedRoute />} >
            <Route path="app" element={<Layout />}>
              <Route index element={<Dashboard />} />

              <Route path="builder/:resumeId" element={<ResumeBuilder />} />
            </Route>
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Route>

          <Route path="view/:resumeId" element={<Preview />} />

        </Route>

        {/* Fallback with no /lang */}
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;
