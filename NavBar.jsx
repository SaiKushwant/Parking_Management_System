import { useNavigate } from "react-router-dom";

function NavBar({ setIsModalOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">Park Easy</h1>
      <div className="header-actions">
        <button
          className="add-station-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Parking Lot
        </button>
        <button onClick={handleLogout} className="logout-btn">
          ↗ Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
