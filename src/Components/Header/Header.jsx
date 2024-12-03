import React, { useContext, useState } from 'react'
import headerStyles from "../Header/header.module.css";
import amazonLogo from "../../assets/amazon_PNG11.png";
import { IoSearchOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import usaFlag from "../../assets/usa-flag-icon.png"
import HeaderChild from './HeaderChild';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

const Header = () => {

  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0);
  // console.log(basket.length);
  
  return (
    <section className={headerStyles.fixed}>
      <div className={headerStyles.all_container}>
        {/* 1st half section -logo & location*/}
        {/* <div> */}
        <div className={headerStyles.logo_container}>
          <Link to="/">
            <img src={amazonLogo} alt="amazon-logo" />
          </Link>
        </div>
        <div className={headerStyles.delivery}>
          <span>
            <CiLocationOn />
          </span>
          <div>
            <p>Deliver to</p>
            <span>United States</span>
          </div>
          {/* </div> */}
        </div>

        {/* 2nd half section search */}
        <div className={headerStyles.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="Search Amazon" />
          <IoSearchOutline size={25} />
        </div>

        {/* 3rd section login, returns & cart */}
        <div>
          <div className={headerStyles.order_container}>
            <Link to="#" className={headerStyles.language}>
              <img src={usaFlag} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={headerStyles.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </div>
      <HeaderChild />
    </section>
  );
}

export default Header