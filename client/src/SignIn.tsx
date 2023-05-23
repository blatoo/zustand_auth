import { useState } from "react";
import { useAuthStore } from "./stores";

export const SignIn = () => {
  const [identifier, setIdentifier] = useState<string | undefined>(
    "jenny@gmail.com"
  );
  const [password, setPassword] = useState<string | undefined>("111111");

  const { loading, error, currentUser, login, logout } = useAuthStore();

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    login(identifier!, password!);
  };

  return (
    <>
      <input
        type="text"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <p>
        <button onClick={onSubmit}>login</button>
        <button onClick={logout}>logout</button>
      </p>
      <p>{JSON.stringify(currentUser)}</p>
      <p>loading: {loading}</p>
      <p>error: {error}</p>
    </>
  );
};
