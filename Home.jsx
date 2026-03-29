import { Link } from "react-router-dom";
import './Home.css';
function Home()
{
    return(
        <div className="home">
            <div className='ev'>
                <h1>Parking Management</h1>  
            </div>
            <div className='man'> 
                <h1>System for Vendors</h1>
            </div>
            <div className='lit'>
                <h4> A complete platform to manage your parking lots, slots, and customer bookings efficiently</h4>
            </div>
            <div className='batan'>
                <Link to="/register"><button type="button" className="registernow">Register</button></Link>
                <Link to="/login"><button type="button" className="loginnow">Login</button></Link>
            </div>
        </div>
    )
}

export default Home;
