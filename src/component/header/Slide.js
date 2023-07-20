import React from "react";
import "./Slide.scss";
import km1 from "../image/km1.jpg";
import km2 from "../image/km2.jpg";
import km3 from "../image/km3.jpg";
import km4 from "../image/km4.jpg";
import { Carousel } from "antd";

const Slide = () => {
  return (
    <>
      <div className="register-content">
        <div className="register-wrap">
          <ul>
            <li className="btn-register">
              <a href="/">Đăng ký thành viên</a>
            </li>
            <li className="btn-login">
              <a href="/">Đăng nhập</a>
            </li>
          </ul>
          <a href="/" className="hotline">
            028 7300 8881
          </a>
        </div>
      </div>

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
