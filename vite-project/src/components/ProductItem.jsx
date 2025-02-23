import "./ProductItem.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

function ProductItem(props) {

    const [index, setIndex] = useState(0);

    function handleNext() {
        index === 2 ? setIndex(0) : setIndex(index + 1);
    }

    const dispatch = useDispatch();

    function handleAddBook(item) {
        dispatch(addItem(item));
    }

    return(
        
        <div className="product-card">
            <Link className="react-router-link" to={`/product/${props.productDetails.id}`} key={props.productDetails.id}>
            <img src={(props.productDetails.images.length > 1 ? props.productDetails.images[index] : props.productDetails.images)} className="product-image" wdith="200px" height="200px"/>
            </Link> 
            
        <div className="product-details">
        <Link className="react-router-link" to={`/product/${props.productDetails.id}`} key={props.productDetails.id}>
            <h1 className="product-title">{props.productDetails.title}</h1>
            <p className="product-brand">{props.productDetails.brand}</p>
            <p className="product-category">{props.productDetails.category}</p>
            <p className="product-rating">{props.productDetails.rating} ☆</p>
            <p className="product-price">₹ {props.productDetails.price}</p>
            </Link>
            <div className="btns">
            <button className="next-btn" onClick={handleNext}>next Image</button>
            <button className="add-btn" onClick={() => handleAddBook(props.productDetails)}>Add to Cart</button>
            </div>
        </div>
        </div>
    )
}

export default ProductItem;