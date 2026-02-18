// auth/withAuth.js
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated]);

    return <>{isAuthenticated ? <Component {...props} /> : null}</>;
  };
};

export default withAuth;
