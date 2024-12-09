import React, { useContext, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider';
import paymentCss from "../Payment/Payment.module.css"
import ProductCard from "../../Components/Product/ProductCard";
import {
  useStripe,
  useElements,CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from "../../API/axios"

import { ClipLoader } from "react-spinners";
import { db } from '../../Utility/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';



function Payment() {

  const [{user, basket},dispatch]= useContext(DataContext);
  // console.log(user);
  
   const totalItem = basket?.reduce((amount, item) => {
     return item.amount + amount;
   }, 0);

     const total = basket.reduce((amount, item) => {
       return item.price * item.amount + amount;
     }, 0);

   const[cardError,setCardError]=useState(null)
   const [processing, setProcessing]=useState(false)

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
   

  const handleChange=(e) =>{
    console.log(e);
    e?.error?.message? setCardError(e?.error?.message):("")  
  };

  const handlePayment=
  async(e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // backend
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // client side
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      //  console.log(paymentIntent);

      //  clear basket and save
      await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
        basket: basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created,
      });
// empty the ordered cart to zero
  dispatch({type:Type.EMPTY_BASKET});


      setProcessing(false);

      navigate("/orders", { state: { msg: "you have placed an order" } });
      
    }catch (error){
      console.log(error);
      setProcessing(false)
    }
  };

  return (
    <Layout>
      {/* payment hesder */}
      <div className={paymentCss.payment_header}>
        Checout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={paymentCss.payment}>
        {/*  customer adress  */}
        <div className={paymentCss.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            {/* <div>customer@email.com</div> */}
            <div>1234 vite road</div>
            <div> Alexandria,VA</div>
          </div>
        </div>
        <hr />
        <div className={paymentCss.flex}>
          <h3>Review itmes and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={paymentCss.flex}>
          <h3>Payment methods</h3>
          <div className={paymentCss.payment_card_container}>
            <div className={paymentCss.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* car error  */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element extacted from stripe */}
                <CardElement onChange={handleChange} />

                <div className={paymentCss.payment_price}>
                  <div>
                    <span className={paymentCss.order}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={paymentCss.loder}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please wait....</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment
