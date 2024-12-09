import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Link } from 'react-router-dom';
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat"
import ProductCard from "../../Components/Product/ProductCard"
import cartClasses from "../Cart/cart.module.css"
// import { ListItem } from '@mui/material';
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { Type } from '../../Utility/action.type';
import { IoMdCheckmarkCircle } from "react-icons/io";

function Cart() {
  const [{basket,user},dispatch]=useContext(DataContext);
  const total= basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

const increment =(item)=>{
  dispatch({
    type: Type.ADD_TO_BASKET,
    item
  });
}
const decrement = (id) => {
  dispatch({
    type: Type.REMOVE_FROM_BASKET,
    id,
  });
};


  return (
    <Layout>
      <div className={cartClasses.allContainer}>
        <div className={cartClasses.cart_Container}>
          <h2>
      
            <IoMdCheckmarkCircle /> Added to Cart
          </h2>
          <h3>your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>No item in your basket</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={cartClasses.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={cartClasses.btn_container}>
                    <button
                      className={cartClasses.btn}
                      onClick={() => increment(item)}
                    >
                      <TiArrowSortedUp />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={cartClasses.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <TiArrowSortedDown />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={cartClasses.subtotal}>
            <div>
              <p>Subtotal ({basket?.length}itmes)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkoout</Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart