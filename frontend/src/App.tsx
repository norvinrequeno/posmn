import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./auth/provider";
import Guard from "./auth/guard";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<>Welcome Page</>} />
          <Route
            path="/dashboard"
            element={
              <Guard>
                <DashboardPage />
              </Guard>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
