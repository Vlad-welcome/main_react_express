import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

export const ProtectedLayout = () => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  // 1. Не авторизован
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Авторизован
  return <Outlet />;
};
