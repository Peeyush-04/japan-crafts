import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function ProtectedRoute({ role }) {
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [unauthToastShown, setUnauthToastShown] = useState(false);

  useEffect(() => {
    if (user && role && user.role !== role && !unauthToastShown) {
      toast.error("You are not authorized to access this page.");
      setUnauthToastShown(true);
    }

    if (!user || (role && user.role !== role)) {
      setChecking(false);
      setIsAuthorized(false);
    } else {
      setChecking(false);
      setIsAuthorized(true);
    }
  }, [user, role, unauthToastShown]);

  if (checking) return null;

  if (!user) return <Navigate to="/auth/login" replace />;

  if (!isAuthorized) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Not Authorized</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return <Outlet />;
}
