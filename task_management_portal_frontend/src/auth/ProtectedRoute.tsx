import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC = () => {
    const { authState } = useAuth();

    return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute