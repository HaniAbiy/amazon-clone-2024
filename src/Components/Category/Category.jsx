import React, { Component } from "react";
import CategoryCard from "./CategoryCard"; 
import categories from "../Category/CategoryItems.js"
import categoryCss from "../Category/category.module.css"

 

function Category() {
  return (
    <div className={categoryCss.category_container}>
      {categories.map((category, index) => (
        <CategoryCard
        key={index}
        data={category}
        />
      ))}
    </div>
  );
}

export default Category;

// class Category extends Component {
//   render() {
//     return (
//       <>
//         {categories.map((itmes, index) => (
//           <CategoryCard
//             key={index}
//             title={itmes.title}
//             imageLink={itmes.imageLink}
//           />
//         ))}
//       </>
//     );
//   }
// }

// export default Category;
