import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>Smart Task Manager</h2>
      <button
        onClick={handleLogout}
        style={{
          background: "transparent",
          border: "1px solid white",
          color: "white",
          padding: "6px 14px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;