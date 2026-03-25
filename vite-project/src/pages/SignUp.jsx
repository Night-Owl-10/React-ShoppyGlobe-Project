import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./SignUp.css"
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


function SignUp() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const [loader, setLoader] = useState(false);
    const [selectedImage, setSelectedImage] = useState("https://res.cloudinary.com/dru7e6cnq/image/upload/v1774356031/default-profile-picture1_cfijqb.jpg");

    const [info, setInfo] = useState({
        avatar: selectedImage,
        name: '',
        contact: '',
        email: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
        password: ''
    });

    const [error, setError] = useState('');

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info, [name]: value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        if (!info.name || !info.contact || !info.email || !info.address || !info.pincode || !info.city || !info.state || !info.country || !info.password) {
            setError('All fields are mandatory');
            return;
        }

        if (isNaN(info.contact)) {
            setError('Contact No. must not contain any alphabets');
            return;
        }

        if (info.contact.length !== 10) {
            setError('Please enter a valid 10-digit Contact No.');
            return;
        }

        if (isNaN(info.pincode)) {
            setError('Pincode must not contain any alphabets');
            return;
        }

        if (info.pincode.length !== 6) {
            setError('Please enter a valid 6-digit Pincode.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/user/register", info, { withCredentials: true });
            console.log(response.data);
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }

    async function uploadImage(e) {
        setLoader(true);
        const img = e.target.files;
        const data = new FormData();
        data.append("file", img ? img[0] : "");
        data.append("upload_preset", "ShoppyGlobe");
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dru7e6cnq/image/upload", data)
            const imageUrl = response.data.url
            setSelectedImage(imageUrl)
            setInfo({ ...info, avatar: imageUrl });
        } catch (error) {
            console.log(error);
            toast.error("Error uploading image");
        } finally {
            setLoader(false);
        }
    }


    return (
        <>
            <div className="form">

                <h1>Please Enter your details to create an account</h1>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="profilePicDiv">
                        {loader && <FontAwesomeIcon icon={faCircleNotch} className="loader" />}
                        <img src={selectedImage} alt="" className="profile-pic" />
                        <label htmlFor="file" className="upload-pic-label">
                            {!loader && <FontAwesomeIcon icon={faUpload} className="upload-pic" />}
                            <input type="file" id="file" onChange={(e) => uploadImage(e)} className="upload-pic-input" />
                        </label>
                    </div>
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={info.name} onChange={handleChange} placeholder="Enter Your Name" />
                    </div>
                    <div className="contact">
                        <label htmlFor="contact">Contact No.:</label>
                        <input type="text" id="contact" name="contact" value={info.contact} onChange={handleChange} placeholder="Enter Your Contact No." />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={info.email} onChange={handleChange} placeholder="Enter Your Email" />
                    </div>
                    <div className="address">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" value={info.address} onChange={handleChange} placeholder="Enter Your address" />
                    </div>
                    <div className="pincode">
                        <label htmlFor="pincode">Pincode:</label>
                        <input type="text" id="pincode" name="pincode" value={info.pincode} onChange={handleChange} placeholder="Enter Your Pincode" />
                    </div>
                    <div className="city">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={info.city} onChange={handleChange} placeholder="Enter Your Address" />
                    </div>
                    <div className="state">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="satate" name="state" value={info.state} onChange={handleChange} placeholder="Enter Your State" />
                    </div>
                    <div className="country">
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" name="country" value={info.country} onChange={handleChange} placeholder="Enter Your Country" />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={info.password} onChange={handleChange} placeholder="Enter Your Password" />
                    </div>

                    {error && <div className="error-msg" style={{ color: 'red' }}>{error}</div>}
                    <div className="signup-btns">
                        <button className="signup-btn" type="submit" id="submit">Sign Up</button>
                        <button className="signup-btn" type="button" id="submit" onClick={() => navigate("/")}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;