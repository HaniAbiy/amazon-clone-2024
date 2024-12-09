import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../../Components/Product/ProductCard'
import { productUrl } from '../../API/endPoints'
import resultCss from "../Results/results.module.css"


function Results() {
  const [results, setResults]=useState([]);
  const { categoryName } = useParams();
  // console.log(categoryName);
  

  useEffect(() =>{

  axios
    .get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      // console.log(res.data); 
      setResults(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  return (
    <Layout>
      <div>
        <h1 style={{ padding: "30px" }}>
          Results{" "}
          <p style={{ fontSize: "12px" }}>
            Check each product page for other buying options. Price and other
            details may vary based on product size and color.
          </p>
        </h1>

        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        <div className={resultCss.product_container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderAdd={true}
              renderDesc={false}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Results