import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
//import data from "../data";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);

    return(
     <div>
        <h1>Featured Products</h1>
          <div className="products">
          {products.map(product =>(
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} height="829" width="679" />
            </Link>
              <div className="product-info">
                <p><Link to={`/product/${product.slug}`}>{product.name}</Link>
                </p>
                <p><strong>${product.price}</strong></p>
              </div>
            </div>
          ))}
        </div>
    </div>
    );
}

export default HomeScreen;