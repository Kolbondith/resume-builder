import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { lang } = useParams();
    const { token, loading } = useSelector((state) => state.auth);

    // Optional: wait until auth check finishes
    if (loading) return null; // or loader

    if (!token) {
        return <Navigate to={`/${lang}/signin`} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
