import "./Header.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

function Header() {

    const cartItem = useSelector(store => store.cart.items);
    console.log(cartItem);

;    return(
        <div className="header">
            
                <Link className="react-router-link" to="/"><div className="shoppyGlobe">ShoppyGlobe</div></Link>
                <Link className="react-router-link" to="/cart">
                <div className="cart-item">{cartItem.length}<FontAwesomeIcon icon={faCartShopping} /></div>
                </Link>
            
        </div>
    )
}

export default Header;