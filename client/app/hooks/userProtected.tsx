import { useSelector } from "react-redux";

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  // If `user` is null or undefined, you might want to show a loading state or redirect
  if (!isAuthenticated || !user) {
    return <div>Loading...</div>; // Or redirect to login
  }

  return <>{children}</>;
};
