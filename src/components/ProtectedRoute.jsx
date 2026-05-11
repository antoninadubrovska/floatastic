import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
	const { user } = useAuthStore();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
