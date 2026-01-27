import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f8f8" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 30 }}>
        <Outlet />
      </div>
    </div>
  );
}





