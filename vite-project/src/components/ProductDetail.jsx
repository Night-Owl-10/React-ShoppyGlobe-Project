import { useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useState, useEffect} from "react";
import "./ProductDetails.css"


function ProductDetail() {

    const params = useParams();
    
    const [products, setProducts] = useState([]);

    const [index, setIndex] = useState(0);

    const { data, error, loading} = useFetch("https://dummyjson.com/products");

    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
     }, [data]);

     if (error) {
        return <p>{error}</p>
     }

     if (loading) {
        return <p>Loading...</p>
     }

     const product = products.filter(product => product.id == params.id);
     console.log(product);


     function handleNext() {
        index === 2 ? setIndex(0) : setIndex(index + 1);
    }
    

    console.log("params", params);

    return(
        <>
            {product.map(product => {
            return(
                <div key={product.id}>
                    <div className="products-section" >
                    <div className="img-section">
                    <img src={product.images.length > 1 ? product.images[index] : product.images} alt="" width="200px" height="200px"/>
                    <button onClick={handleNext}>next</button>
                    <h1>{product.title}</h1>
                    <p className="products-rating">{product.rating} ☆</p>
                   <p className="products-stock">{product.availabilityStatus}</p>
                    <p className="products-price">₹ {product.price}</p>
                    <p className="products-discount">{product.discountPercentage} % off</p>
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