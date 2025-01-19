import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import SignupForm from "./pages/Signup";
import { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticated().then((allowed) => {
      setIsAllowed(allowed);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;
  return isAllowed ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <ProtectedRoute element={<Home />} /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
    ],
  },
]);

export default router;
