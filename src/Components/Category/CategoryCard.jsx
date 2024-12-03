import React, { Component } from "react";
// import "./CategoryItems";
import categoryCss from "../Category/category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className={categoryCss.category_card}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h3>{data?.title}</h3>
        </span>
        <img src={data?.imageLink} alt="" />

        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;

