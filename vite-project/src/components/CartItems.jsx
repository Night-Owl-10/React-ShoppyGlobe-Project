import { useSelector } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./CartItems.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

function CartItems() {

    const cartItems = useSelector(store => store.cart.items);

    const dispatch = useDispatch();

    function handleRemoveBook(itemId) {
        dispatch(removeItem(itemId))
    }

    const handleIncreaseQuantity = (itemId) => {
        dispatch(increaseQuantity(itemId));  
      };
    
      const handleDecreaseQuantity = (itemId) => {
        dispatch(decreaseQuantity(itemId)); 
      };

      const handleButtonClick = (e) => {
        if (cartItems.length == 0) {
          e.preventDefault(); 
          alert('Your Cart is Empty');
        } else {
          navigate('/checkout'); 
        }
      };

    return (
        <>
        {cartItems.length == 0 ? <h1>Your Cart is Empty!</h1> :
             cartItems.map(items => {
                return(
                    <div className="checkout-section" key={items.id}>
                      <div className="checkout-img-btn">
                        <div className="checkout-img" >
                      <img src={items.images[0]} alt="" width="300px" height="300px"/>
                      </div>
                      <div className="checkout-btn">
                      <button className="remove-btn" onClick={() => handleRemoveBook(items.id)}><FontAwesomeIcon icon={faTrash} /></button>
                       <div className="btn-2">
                       <button class="decrement-btn" onClick={() => handleDecreaseQuantity(items.id)}><FontAwesomeIcon icon={faMinus} /></button>
                       <p>{items.quantity}</p>
                       <button className="increment-btn" onClick={() => handleIncreaseQuantity(items.id)}><FontAwesomeIcon icon={faPlus} /></button>
                       </div>
                       </div>
                       </div>
                       <div className="checkout-details">
                       <h1>{items.title}</h1>
                       <p>{items.brand}</p>
                       <p>{items.shippingInformation}</p>
                       <p className="checkout-price">₹ {items.price}</p>
                       <p className="checkout-discount">{items.discountPercentage} % off</p>
                       </div>
                       </div>
                )
                })}
        <Link className="react-router-link" to="/checkout">
         <button className="proceed-btn" onClick={handleButtonClick} >Procced to Checkout</button>
        </Link>
        </>
    )
}

export default CartItems;