import "./Header.css"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from "react";
import SignIn from "./SignIn";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {

    const [profile, setProfile] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const { user, setUser } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    async function handleSignOut() {

        try {
            const response = await axios.post("http://localhost:3000/api/user/logout", {}, { withCredentials: true });
            toast.success(response.data.message);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
        } catch (error) {
            toast.error("Error signing out. Please try again.");
        }
    }

    return (
        <div className="header">

            <Link className="react-router-link" to="/"><div className="shoppyGlobe">ShoppyGlobe</div></Link>
            <div className="header-right">
                <Link className="react-router-link" to="/cart">
                    <div className="cart-item">{cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}<FontAwesomeIcon icon={faCartShopping} /></div>
                </Link>
                <div className="user-profile" onClick={() => setProfile(prev => !prev)}>
                    <img src={user ? user.avatar : "https://res.cloudinary.com/dru7e6cnq/image/upload/v1774356042/profile_n0nnut.png"} alt="" />
                    {profile && (
                        <div className="profile-dropdown">
                            {user ? (
                                <>
                                    <div className="profile-dropdown-item" onClick={() => navigate("/profile")}>My Account</div>
                                    <div className="profile-dropdown-item" onClick={handleSignOut}>Sign Out</div>
                                </>
                            ) : (
                                <>
                                    <div className="profile-dropdown-item" onClick={(e) => { e.stopPropagation(); navigate("/signup"); setProfile(false); }}>Sign Up</div>
                                    <div className="profile-dropdown-item" onClick={(e) => { e.stopPropagation(); setShowSignIn(true); setProfile(false); }}>Sign In</div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
        </div>
    )
}

export default Header;