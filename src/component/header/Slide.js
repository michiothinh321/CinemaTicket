import React from "react";
import "./Header.scss";
import km1 from "../image/km1.jpg";
import km2 from "../image/km2.jpg";
import km3 from "../image/km3.jpg";
import km4 from "../image/km4.jpg";
import { Carousel } from "antd";

const Slide = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <img className="slide_img" src={km1} alt="" />
        </div>
        <div>
          <img className="slide_img" src={km2} alt="" />
        </div>
        <div>
          <img className="slide_img" src={km3} alt="" />
        </div>
        <div>
          <img className="slide_img" src={km4} alt="" />
        </div>
      </Carousel>
    </>
  );
};

export default Slide;
