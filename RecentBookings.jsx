import React, { useState, useEffect } from "react";
import "./RecentBookings.css";

export default function RecentBookings() {
  const [showAll, setShowAll] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payment/orders");
        const data = await res.json();
         const sorted = data.sort((a, b) => new Date(b.from) - new Date(a.from));
          setBookings(sorted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="recent-bookings">
      <h2>Recent Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <>
          {/* Show only 2 latest bookings */}
          <div>
            {bookings.slice(0, 2).map((b, idx) => (
              <div key={b._id || idx} className="booking-item">
                <p><strong>{b.user_name}</strong></p>
                <p className="booking-date">
                  {new Date(b.from).toLocaleString()} → {new Date(b.to).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Show More button */}
          {bookings.length > 2 && !showAll && (
            <button className="btn-show-more" onClick={() => setShowAll(true)}>
              Show More
            </button>
          )}

          {/* Modal Popup */}
          {showAll && (
            <div className="modal-overlay" onClick={() => setShowAll(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowAll(false)}>×</button>
                <h3>All Bookings</h3>
                <div className="modal-bookings-scroll">
                  {bookings.map((b, idx) => (
                    <div key={b._id || idx} className="booking-item">
                      <p><strong>{b.user_name}</strong></p>
                      <p className="booking-date">
                        {new Date(b.from).toLocaleString()} → {new Date(b.to).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
