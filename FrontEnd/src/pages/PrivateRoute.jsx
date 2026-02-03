import { Navigate } from "react-router-dom";

const PrivateRoute = ({ autenticado, children }) => {
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
