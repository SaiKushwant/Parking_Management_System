"use client"

import "./Dashboard.css"
import { useState, useEffect } from "react"
import Pop from "./Pop.jsx"
import NavBar from "./NavBar.jsx"
import { useNavigate } from "react-router-dom";

function Dashboard({ isModalOpen, setIsModalOpen, userdetails,setlotdetails }) {
  const navigate = useNavigate();
  const [tasks, settasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch tasks for the logged in user
  useEffect(() => {
  fetchTasks()
}, [userdetails?.id])

const fetchTasks = async () => {
  if (!userdetails?.id) return

  setIsLoading(true)
  setError(null)

  try {
    const res = await fetch(`http://localhost:5001/api/tasks/${userdetails.id}`)
    if (!res.ok) throw new Error("Failed to fetch tasks")
    const data = await res.json()
    settasks(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}


const handlelot = (lot) => {
  setlotdetails(lot)
  navigate(`/details`);
};

  return (
    <div className="dashboard">
      <Pop isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userdetails={userdetails} fetchTasks={fetchTasks} />

      <NavBar setIsModalOpen={setIsModalOpen} />

      {isLoading && <p className="loading-text">Loading tasks...</p>}
      {error && <p className="error-text">❌ {error}</p>}

      <div className="cards-container">
        {tasks.length > 0 ? (
          tasks.map((lot) => (
            <div key={lot._id} className="parking-card">
              <div className="card-header">
                <h3 className="card-title">{lot.name}</h3>
                <span className="price-tag">${lot.price}/hr</span>
              </div>

              <p className="card-address">{lot.address}</p>

              <div className="card-footer">
               <button 
  className="view-details-btn" 
  onClick={() => handlelot(lot)}
>
  View Details
</button>

              </div>
            </div>
          ))
        ) : (
          !isLoading && <p>No tasks found for this user.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
