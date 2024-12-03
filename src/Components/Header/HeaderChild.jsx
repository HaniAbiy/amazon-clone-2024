import React from 'react'
import headerStyles from "../Header/header.module.css"
import { IoMdMenu } from "react-icons/io";

function HeaderChild() {
  return (
    <div className={headerStyles.lower_container}>
      <ul>
        <li>
          <IoMdMenu />
               <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Custumer Service</li>
        <li>Registory</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default HeaderChild