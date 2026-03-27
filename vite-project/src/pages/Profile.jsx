import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPenToSquare, faCircleNotch, faCheck } from '@fortawesome/free-solid-svg-icons'

import "./Profile.css";

function Profile() {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [profileAvatar, setProfileAvatar] = useState(user?.avatar ?? "");
    const [loader, setLoader] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editContact, setEditContact] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [editPincode, setEditPincode] = useState(false);
    const [editCity, setEditCity] = useState(false);
    const [editState, setEditState] = useState(false);
    const [editCountry, setEditCountry] = useState(false);
    const [error, setError] = useState('');
    const [editedUser, setEditedUser] = useState({
        avatar: profileAvatar,
        name: user?.name ?? "",
        contact: user?.contact ?? "",
        email: user?.email ?? "",
        address: user?.address ?? "",
        pincode: user?.pincode ?? "",
        city: user?.city ?? "",
        state: user?.state ?? "",
        country: user?.country ?? ""
    });

    if (!user) {
        return <Navigate to="/" replace />;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    }

    async function handleImageChange(e) {
        setLoader(true);
        const img = e.target.files;
        const data = new FormData();
        data.append("file", img ? img[0] : "");
        data.append("upload_preset", "ShoppyGlobe");
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, data)
            const imageUrl = response.data.url
            setProfileAvatar(imageUrl)
            setEditedUser(prev => ({ ...prev, avatar: imageUrl }));
        } catch (error) {
            console.log(error);
            toast.error("Error uploading image");
        } finally {
            setLoader(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();


        setError('');

        if (!editedUser.name || !editedUser.contact || !editedUser.email || !editedUser.address || !editedUser.pincode || !editedUser.city || !editedUser.state || !editedUser.country) {
            setError('All fields are mandatory');
            return;
        }

        if (isNaN(editedUser.contact)) {
            setError('Contact No. must not contain any alphabets');
            return;
        }

        if (editedUser.contact.length !== 10) {
            setError('Please enter a valid 10-digit Contact No.');
            return;
        }

        if (isNaN(editedUser.pincode)) {
            setError('Pincode must not contain any alphabets');
            return;
        }

        if (editedUser.pincode.length !== 6) {
            setError('Please enter a valid 6-digit Pincode.');
            return;
        }
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/` + user._id, editedUser, { withCredentials: true });
            localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
            setUser(response.data.updatedUser);
            toast.success(response.data.message);
        } catch (error) {
            console.log("catch triggered:", error);
            toast.error(error.response?.data?.message || "Error updating profile");
        }
    }

    async function handleDeleteAccount() {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/` + user._id, { withCredentials: true });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            console.log("catch triggered:", error);
            toast.error(error.response?.data?.message || "Error deleting account");
        }
    }


    return (
        <div className="profile">
            <button className="back-btn" onClick={() => navigate("/")}><FontAwesomeIcon icon={faArrowLeft} />back</button>
            <h1>Your Account</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="avatarContainer">
                    {loader && <FontAwesomeIcon icon={faCircleNotch} className="loader" />}
                    <img src={profileAvatar} alt="" className="avatarImage" />
                    <label htmlFor="file" className="avatarUploadLabel">
                        {!loader && <FontAwesomeIcon icon={faPenToSquare} />}
                        <input type="file" id="file" onChange={(e) => handleImageChange(e)} className="avatarUploadInput" />
                    </label>
                </div>

                <div className="name">
                    <label htmlFor="name">Name:</label>
                    {editName ? (
                        <>
                            <input type="text" id="name" name="name" value={editedUser.name} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditName(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.name}</span>
                            <button type="button" onClick={() => setEditName(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="contact">
                    <label htmlFor="contact">Contact No.:</label>
                    {editContact ? (
                        <>
                            <input type="text" id="contact" name="contact" value={editedUser.contact} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditContact(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.contact}</span>
                            <button type="button" onClick={() => setEditContact(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="email">
                    <label htmlFor="email">Email:</label>
                    {editEmail ? (
                        <>
                            <input type="email" id="email" name="email" value={editedUser.email} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditEmail(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.email}</span>
                            <button type="button" onClick={() => setEditEmail(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="address">
                    <label htmlFor="address">Address:</label>
                    {editAddress ? (
                        <>
                            <input type="text" id="address" name="address" value={editedUser.address} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditAddress(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.address}</span>
                            <button type="button" onClick={() => setEditAddress(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="pincode">
                    <label htmlFor="pincode">Pincode:</label>
                    {editPincode ? (
                        <>
                            <input type="text" id="pincode" name="pincode" value={editedUser.pincode} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditPincode(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.pincode}</span>
                            <button type="button" onClick={() => setEditPincode(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="city">
                    <label htmlFor="city">City:</label>
                    {editCity ? (
                        <>
                            <input type="text" id="city" name="city" value={editedUser.city} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditCity(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.city}</span>
                            <button type="button" onClick={() => setEditCity(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="state">
                    <label htmlFor="state">State:</label>
                    {editState ? (
                        <>
                            <input type="text" id="state" name="state" value={editedUser.state} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditState(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.state}</span>
                            <button type="button" onClick={() => setEditState(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                <div className="country">
                    <label htmlFor="country">Country:</label>
                    {editCountry ? (
                        <>
                            <input type="text" id="country" name="country" value={editedUser.country} onChange={(e) => handleChange(e)} />
                            <button type="button" onClick={() => setEditCountry(false)}><FontAwesomeIcon icon={faCheck} /></button>
                        </>
                    ) : (
                        <>
                            <span>{editedUser.country}</span>
                            <button type="button" onClick={() => setEditCountry(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        </>
                    )}
                </div>
                {error && <div className="error-msg" style={{ color: 'red' }}>{error}</div>}
                <div className="profile-btn">
                    <button type="submit" className="update-btn">Update</button>
                    <button type="button" className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;