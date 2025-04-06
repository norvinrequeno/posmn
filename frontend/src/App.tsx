import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./auth/provider";
import Guard from "./auth/guard";
import { routesApp } from "./routes";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {routesApp.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={r.guard ? <Guard>{r.element}</Guard> : r.element}
            />
          ))}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
