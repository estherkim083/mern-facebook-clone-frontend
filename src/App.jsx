import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import AlreadyLoggedInRoutes from "./routes/AlreadyLoggedInRoutes";
import Activate from "./pages/HomePage/activate";
import Reset from "./pages/Reset";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/activate" element={<Activate />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AlreadyLoggedInRoutes />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
