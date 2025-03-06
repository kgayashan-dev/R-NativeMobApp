import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;
