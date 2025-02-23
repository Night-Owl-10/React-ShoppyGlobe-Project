import { useState } from "react";
import { useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import "./Checkout.css"

function Checkout() {

    const cartItem = useSelector(store => store.cart.items);

    const dispatch = useDispatch();

    const [info, setInfo] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
});

const [error, setError] = useState('');

const handleChange = (e) => {
    const {name, value} = e.target;
    setInfo({
        ...info, [name]: value
    });
};

function handleSubmit(e) {
    e.preventDefault();

    setError('');

    if(!info.name || !info.contact || !info.email || !info.address || !info.pincode || !info.city || !info.state || !info.country) {
        setError('All fields are mandatory');
        setErr(true);
        return;
    }

    if(isNaN(info.contact)) {
        setError('Contact No. must not contain any alphabets');
        return;
    }

    if(info.contact.length !== 10) {
        setError('Please enter a valid 10-digit Contact No.');
        return;
    }

    if(isNaN(info.pincode)) {
        setError('Pincode must not contain any alphabets');
        return;
    }

    if(info.pincode.length !== 6) {
        setError('Please enter a valid 6-digit Pincode.');
        return;
    }

    if (cartItem.length == 0) {
        alert("You cannot placed order as your cart is empty.");
    }  else {
        alert("Your order has been placed. Thank you, for shopping at ShoppyGlobe.")
        dispatch(clearCart());
    }
}

   
    return(
        <>
         <div className="form">

            <h1>Please fill out this form to place your order</h1>    
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={info.name} onChange={handleChange} placeholder="Enter Your Name"/>
                    </div>
                    <div className="contact">
                        <label htmlFor="contact">Contact No.:</label>
                        <input type="text" id="contact" name="contact" value={info.contact} onChange={handleChange} placeholder="Enter Your Contact No."/>
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={info.email} onChange={handleChange} placeholder="Enter Your Email"/>
                    </div>
                    <div className="address">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" value={info.address} onChange={handleChange} placeholder="Enter Your address"/>
                    </div>
                    <div className="pincode">
                        <label htmlFor="pincode">Pincode:</label>
                        <input type="text" id="pincode" name="pincode" value={info.pincode} onChange={handleChange} placeholder="Enter Your Pincode"/>
                    </div>
                    <div className="city">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={info.city} onChange={handleChange} placeholder="Enter Your Address"/>
                    </div>
                    <div className="state">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="satate" name="state" value={info.state} onChange={handleChange} placeholder="Enter Your State"/>
                    </div>
                    <div className="country">
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" name="country" value={info.country} onChange={handleChange} placeholder="Enter Your Country"/>
                    </div>
                    
                    {error && <div className="error-msg" style={{ color: 'red' }}>{error}</div>}
                    <div > 
                        <button className="order-btn" type="submit" id="submit">Place Order</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Checkout;