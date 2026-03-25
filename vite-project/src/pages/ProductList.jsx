import ProductItem from "../components/ProductItem";
import "./ProductList.css";
import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function ProductList() {

    const [searchProduct, setSearchProduct] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const { data, error, loading } = useFetch("https://dummyjson.com/products");

    useEffect(() => {
        if (data) {
            setAllProducts(data.products);
            setFilteredProducts(data.products);
        }
    }, [data]);

    useEffect(() => {
        if (searchProduct.trim() === "") {
            setFilteredProducts(allProducts);
        } else {
            const filterProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchProduct.toLowerCase()));
            setFilteredProducts(filterProducts);
        }
    }, [searchProduct, allProducts]);

    if (error) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>{error}</div>
    }

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Loading...</div>
    }

    return (

        <>
            <div className="search">
                <input type="text" className="search-input" placeholder="Search for products here" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                <button className="search-btn" onClick={() => { }}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
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