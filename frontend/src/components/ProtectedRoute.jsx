import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    // Agar login nahi hai ya admin nahi hai, toh login page par bhej do
    return <Navigate to="/login" replace />;
  }

  // Agar admin hai, toh component (children) dikhao
  return children;
};

export default ProtectedRoute;
