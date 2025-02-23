import ProductItem from "./ProductItem";
import "./ProductList.css";
import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function ProductList() {

    const [searchProduct, setSearchProduct] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    function handleSearch() {
        const filterProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchProduct.toLowerCase()));
        setFilteredBooks(filterProducts);
    }

    console.log(filteredProducts);

    const { data, error, loading} = useFetch("https://dummyjson.com/products");

    useEffect(() => {
        if (data) {
            setFilteredProducts(data.products);
        }
     }, [data]);

     if (error) {
        return <p>{error}</p>
     }

     if (loading) {
        return <p>Loading...</p>
     }

    /*async function fetchData() {
       const response = await fetch("https://dummyjson.com/products");
       const result = await response.json();
       console.log(result);

       setFilteredBooks(result.products);
    }*/
    
    return(

        <>
        <div className="search">
                <input type="text" className="search-input" placeholder="Search for products here" onChange={(e) => setSearchProduct(e.target.value)}/>
                <button className="search-btn" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>

        <div className="productList">
           {filteredProducts.map((data) => (
            <ProductItem key={data.id} productDetails={data}></ProductItem>
            ))}    
        </div>
        </>
    )
}

export default ProductList;