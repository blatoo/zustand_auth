import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath: string;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  isAllowed,
  children,
  redirectPath = "/signin",
}: ProtectedRouteProps) => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!isAllowed) {
  //       navigate(redirectPath);
  //     }
  //   }, [isAllowed, navigate, redirectPath]);

  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  const Res = children ? children : <Outlet />;

  return Res as JSX.Element;
};
