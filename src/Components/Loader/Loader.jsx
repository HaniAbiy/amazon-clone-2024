import React from 'react'
import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div 
    style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"50hv",
    }}>
      <FadeLoader color="#48B7DC" />
    </div>
  );
}
export default Loader