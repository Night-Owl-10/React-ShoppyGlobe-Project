import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./SignIn.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function SignIn({ setShowSignIn }) {

    const { setUser } = useContext(AuthContext);

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const handleLoginInfo = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/user/login", loginInfo, { withCredentials: true });
            console.log(response.data);
            toast.success(response.data.message);
            setShowSignIn(false);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.response?.data?.message || "Error signing in");
        }
    }

    return (
        <div className="signin">
            <div className="signin-container">
                <div className="signin-header">
                    <h2>Sign In</h2>
                </div>
                <div className="signin-body">
                    <form onSubmit={handleLogin}>
                        <div className="signin-form-group">
                            <input type="email" id="email" name="email" placeholder="Email" value={loginInfo.email} onChange={handleLoginInfo} />
                        </div>
                        <div className="signin-form-group">
                            <input type="password" id="password" name="password" placeholder="Password" value={loginInfo.password} onChange={handleLoginInfo} />
                        </div>
                        <p className="signin-signup-prompt">Don't have an account? <Link className="signup-link" to="/signup" onClick={() => setShowSignIn(false)}>Sign Up</Link></p>
                        <div className="signin-buttons">
                            <button type="submit">Sign In</button>
                            <button type="button" onClick={() => setShowSignIn(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;