import React from 'react'
import {Carousel } from 'react-responsive-carousel'
import {img} from './image/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCss from './carousel.module.css'

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItems) => {
          return <img src={imageItems} />;
        })}
      </Carousel>
      
      <div className={CarouselCss.hero_img}></div>
    </div>
  );
}

export default CarouselEffect