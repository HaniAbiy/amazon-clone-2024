import React, { useEffect, useState } from 'react'
import ProductCard from '../Product/ProductCard';
import axios from "axios"
import productCss from "../Product/product.module.css"
import Loader from '../Loader/Loader';



function Product() {
    const [products, setProducts]=useState([]);
     const [isLoading, setisLoading] = useState(false);
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((res)=> {
            setProducts(res.data);
            setisLoading(false)
        })
         .catch ((err)=>{
            console.log(err)
           setisLoading(false)
            
        });
    },[]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={productCss.product_container}>
          {products.map((singleProduct) => (
            <ProductCard  renderAdd={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </div>
      )}
    </>
  );

  }
 
export default Product