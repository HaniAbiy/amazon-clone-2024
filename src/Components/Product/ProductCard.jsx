import React, { useContext } from 'react'
import Rating from "@mui/material/Rating"
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import productCss from "../Product/product.module.css"
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

 function ProductCard({product,flex , renderDesc, renderAdd}) {
    const {image, title, id, rating, price,description} = product;
    const [state,dispatch]=useContext(DataContext)
    // console.log(state);
    

    
    
    const addToCart = () => {
      dispatch ({
        type:Type.ADD_TO_BASKET,
        item:{image, title, id, rating, price,description

        }
      
    })
    }



  return (
    <div
      className={`${productCss.card_container} ${
        flex ? productCss.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        {/* product image */}
        <img src={image} alt="" />
      </Link>
      {/* product title */}
      <div className={productCss.rating}>
        <h3>{title}</h3>
        {renderDesc && (
          <div className={productCss.description}>{description}</div>
        )}
        <div>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={productCss.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard