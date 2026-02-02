import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const { lang } = useParams();
    const { token, loading } = useSelector((state) => state.auth);

    // Wait until auth hydration finishes
    if (loading) return null;

    // If logged in → go to app
    if (token) {
        return <Navigate to={`/${lang}/app`} replace />;
    }

    // Otherwise allow access (signin/signup)
    return <Outlet />;
};

export default PublicRoute;
