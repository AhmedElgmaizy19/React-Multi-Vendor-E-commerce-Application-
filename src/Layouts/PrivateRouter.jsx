import { Navigate } from "react-router-dom";
import userAuthStore from "../store/authSlice";

export default function PrivateRouter({children}) {
    const loggedIn = userAuthStore((state) => state.IsLoggedIn());
    return loggedIn ? <>{children}</> : <Navigate to="/login" />;
}