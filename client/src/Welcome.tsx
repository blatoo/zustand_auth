import { useAuthStore } from "./stores";

export const Welcome = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <>
      <h1>Welcome</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};
