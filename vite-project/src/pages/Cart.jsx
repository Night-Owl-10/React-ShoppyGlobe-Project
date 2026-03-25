import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Cart() {

  const { cartItems, fetchCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  async function handleRemoveProduct(cartItemId) {
    try {
      const response = await axios.delete("http://localhost:3000/api/cart/" + cartItemId, { withCredentials: true });
      toast.success(response.data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing item");
    }
  }

  async function handleIncreaseQuantity(cartItemId) {
    try {
      await axios.put("http://localhost:3000/api/cart/" + cartItemId + "/increase", {}, { withCredentials: true });
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating quantity");
    }
  }

  async function handleDecreaseQuantity(cartItemId) {
    try {
      await axios.put("http://localhost:3000/api/cart/" + cartItemId + "/decrease", {}, { withCredentials: true });
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating quantity");
    }
  }

  async function handleConfirmOrder(e) {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your Cart is Empty");
      return;
    }
    try {
      const response = await axios.delete("http://localhost:3000/api/cart/confirm", { withCredentials: true });
      fetchCart();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error confirming order");
    }
  }

  if (!user) {
    return (
      <div className="empty-cart">
        <FontAwesomeIcon icon={faCartArrowDown} />
        <h1>Please sign in to view your cart!</h1>
        <Link to="/"><button>Back to Home</button></Link>
      </div>
    );
  }

  return (
    <>
      {cartItems.length === 0 ?
        <div className="empty-cart">
          <FontAwesomeIcon icon={faCartArrowDown} />
          <h1>Your Cart is Empty!</h1>
          <Link to="/"><button>Back to Home</button></Link>
        </div>
        :
        cartItems.map(item => {
          return (
            <div className="checkout-section" key={item._id}>
              <div className="checkout-img-btn">
                <div className="checkout-img">
                  <img src={item.thumbnail} alt={item.title} width="300px" height="300px" />
                </div>
                <div className="checkout-btn">
                  <button className="remove-btn" onClick={() => handleRemoveProduct(item._id)}><FontAwesomeIcon icon={faTrash} /></button>
                  <div className="btn-2">
                    <button className="decrement-btn" onClick={() => handleDecreaseQuantity(item._id)}><FontAwesomeIcon icon={faMinus} /></button>
                    <p>{item.quantity}</p>
                    <button className="increment-btn" onClick={() => handleIncreaseQuantity(item._id)}><FontAwesomeIcon icon={faPlus} /></button>
                  </div>
                </div>
              </div>
              <div className="checkout-details">
                <h1>{item.title}</h1>
                <p className="checkout-price">₹ {item.price}</p>
                <p className="checkout-price">Total: ₹ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          )
        })}
      {cartItems.length > 0 &&
        <button className="proceed-btn" onClick={handleConfirmOrder}>Confirm Order</button>
      }
    </>
  )
}

export default Cart;