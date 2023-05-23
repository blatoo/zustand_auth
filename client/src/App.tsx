import { useAuthStore } from "./stores";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Welcome } from "./Welcome";
import { SignIn } from "./SignIn";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const currentUser = useAuthStore((state) => state.currentUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!!currentUser} redirectPath="/signin">
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
