import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProductDetails.css"



function ProductDetail() {

    const params = useParams();

    const [products, setProducts] = useState([]);

    const [index, setIndex] = useState(0);

    const [next, setNext] = useState(1);

    const { data, error, loading } = useFetch("https://dummyjson.com/products");

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const { fetchCart } = useContext(CartContext);

    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
    }, [data]);

    if (error) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>{error}</div>
    }

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>
    }

    const product = products.filter(product => product.id == params.id);


    function handleNext() {
        index === 2 ? setIndex(0) : setIndex(index + 1);

        if (product[0].images.length <= next) {
            setNext(1)
            console.log(next)
        } else if (product[0].images.length > next) {
            setNext(next + 1);
            console.log(next)
        }
    }

    async function handleAddProduct() {
        if (!user) {
            toast.info("Please sign in to add items to your cart");
            return;
        }
        try {
            const productData = products.find(p => p.id == params.id);
            const { id: productId, title, price, thumbnail } = productData;
            await axios.post("http://localhost:3000/api/cart", { productId, title, price, thumbnail }, { withCredentials: true });
            toast.success(`"${title}" added to cart!`);
            fetchCart();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding to cart");
        }
    }


    return (
        <>
            <button className="back-btn" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Home
            </button>
            {product.map(product => {
                return (
                    <div key={product.id}>
                        <div className="products-section" >
                            <div className="img-section">
                                <img src={product.images.length > 1 ? product.images[index] : product.images} alt="" width="200px" height="200px" />
                                <button onClick={handleNext}>Next image {next}/{product.images.length}</button>
                                <button onClick={handleAddProduct}>Add to Cart</button>
                                <h1>{product.title}</h1>
                                <div className="product-meta">
                                    <p className="products-rating">{product.rating} ☆</p>
                                    <p className="products-stock">{product.availabilityStatus}</p>
                                    <p className="products-price">₹ {product.price}</p>
                                    <p className="products-discount">{product.discountPercentage} % off</p>
                                </div>
                            </div>
                            <div className="details-section">
                                <div className="products-description">
                                    <h1>Product Description</h1>
                                    <p>{product.description}</p>
                                    <img src={product.thumbnail} alt=""></img>
                                </div>
                                <div className="products-details">
                                    <h1>Product Details</h1>
                                    <p><span>Brand:</span> {product.brand}</p>
                                    <p><span>Category:</span> {product.category}</p>
                                    <p><span>Minimum Order Quantity:</span> {product.minimumOrderQuantity}</p>
                                    <p><span>Products in Stock:</span> {product.stock}</p>
                                    <p><span>Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} units</p>
                                    <p><span>Weight:</span> {product.weight}</p>
                                    <p><span>Shipping:</span> {product.shippingInformation}</p>
                                    <p><span>Return Policy:</span> {product.returnPolicy}</p>
                                    <p><span>Warranty</span>: {product.warrantyInformation}</p>
                                </div>
                            </div>
                        </div>
                        <h1 className="reviews-heading">Product Reviews</h1>
                        <div className="products-reviews">
                            {product.reviews.map((review, index) => (
                                <div key={index} className="reviews">
                                    <h2>Review {index + 1}</h2>
                                    <p><span>Rating:</span> {review.rating} stars</p>
                                    <p><span>Comment:</span> {review.comment}</p>
                                    <p><span>Reviewer:</span> {review.reviewerName}</p>
                                    <p><span>Email:</span> {review.reviewerEmail}</p>
                                    <p><span>Date:</span> {(review.date)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductDetail;