import React, { useState, useEffect } from "react";
import { Car, LogOut, ArrowLeft, MapPin, Clock, Star, List } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const API_URL = "https://pms-backend-gyvr-git-main-saikushwants-projects.vercel.app";

interface Order {
  id: string;
  lot_id: string;
  user_id: string;
  from: string;
  to: string;
}

type Place = {
  _id: string;
  name: string;
  totalLots: number;
  latitude: number;
  longitude: number;
  price: number;
  address: string;
  image: string;
  features: string[];
  secretKey: string;
  rating: number;
};

interface User {
  id: string;
  name: string;
  email: string;
}

interface ParkingDashboardProps {
  user: User;
  onLogout: () => void;
}

const createPinIcon = (color: string, label: string) =>
  new L.DivIcon({
    html: `<div style="position: relative;">
      <svg width="30" height="42" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7z"/>
      </svg>
      <span style="position:absolute;top:8px;color:white;font-size:12px;">${label}</span>
    </div>`,
    className: "",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

const ParkingDashboard: React.FC<ParkingDashboardProps> = ({ user, onLogout }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PLACES
  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then(res => res.json())
      .then(setPlaces)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 🔥 FETCH ORDERS
  useEffect(() => {
    fetch(`${API_URL}/api/payment/orders`)
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  // 🔥 FETCH REVIEWS
  useEffect(() => {
    if (!selectedPlace) return;
    fetch(`${API_URL}/api/reviews?lot_id=${selectedPlace._id}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(console.error);
  }, [selectedPlace]);

  // 🔥 PAYMENT
  const makePayment = async () => {
    const res = await fetch(`${API_URL}/api/payment/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lot_id: selectedPlace?._id,
        user_name: user.name,
        from: selectedFrom,
        to: selectedTo,
        amount: 100
      })
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome {user.name}</h2>

      {selectedPlace ? (
        <div>
          <button onClick={() => setSelectedPlace(null)}>Back</button>
          <h2>{selectedPlace.name}</h2>

          <button onClick={makePayment}>Book Now</button>

          <h3>Reviews</h3>
          {reviews.map((r, i) => (
            <div key={i}>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {places.map(p => (
            <div key={p._id}>
              <h3>{p.name}</h3>
              <button onClick={() => setSelectedPlace(p)}>View</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParkingDashboard;
