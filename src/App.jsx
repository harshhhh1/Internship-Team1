import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import MyActivity from "./pages/MyActivity";
import History from "./pages/History";
import ViewProfile from "./pages/ViewProfile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/my-activity" element={<MyActivity />} />
        <Route path="/history" element={<History />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}


export default App;