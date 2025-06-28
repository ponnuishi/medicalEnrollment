import { useEffect } from "react";
import { useLocation } from "wouter";
import { AuthService } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      setLocation("/login");
    }
  }, [setLocation]);

  if (!AuthService.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}