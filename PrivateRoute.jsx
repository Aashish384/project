import { Loader } from "@mantine/core";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const { userLoading, isAuthenticated } = useSelector((state) => state.user);
  const { myProfileLoading, myProfile } = useSelector((state) => state.profile);

  if (userLoading || myProfileLoading) {
    return <Loader />;
  } else if (isAuthenticated && myProfile && allowedRoles.includes(myProfile.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
