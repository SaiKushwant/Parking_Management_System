import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Car, CheckCircle } from "lucide-react";
import RecentBookings from "./RecentBookings";
import "./Viewdetails.css";

export default function Viewdetails({ lot }) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!lot) return <p className="loading">Loading lot details...</p>;

  return (
    <div className="details-page">
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <div className="header-logo">
          <Car size={28} color="#4f46e5" />
          <span>ParkEase</span>
        </div>
      </header>

      <main className="details-container">
        <div className="lot-main">
          <div className="lot-image">
            <img src={lot.image} alt={lot.name} />
          </div>

          <div className="lot-info">
            <h1>{lot.name}</h1>
            <p className="lot-address">
              <MapPin size={16} /> {lot.address}
            </p>

            <div className="lot-stats">
              <div className="stat">
                <span>Total Capacity</span>
                <strong>{lot.totalLots}</strong>
              </div>
              <div className="stat">
                <span>Price</span>
                <strong>${lot.price}/hour</strong>
              </div>
              
            </div>

            <div className="lot-features">
              <h2>Features</h2>
              {lot.features.length > 0 ? (
                <ul>
                  {lot.features.map((f, idx) => (
                    <li key={idx}>
                      <CheckCircle size={18} color="#10b981" /> {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-features">No features listed.</p>
              )}
            </div>
          </div>
        </div>

        <RecentBookings />
      </main>
    </div>
  );
}
