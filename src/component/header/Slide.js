import React from 'react';
import './Slide.scss';
import logo from '../image/one-piece.jpg'
import { Carousel } from 'antd';

const Slide = () => {
    return (
        <Carousel autoplay>
    <div>
      <img className='slide_img' src={logo}  alt='' />
    </div>
    <div>
    <img className='slide_img' src={logo}  alt='' />
    </div>
    <div>
    <img className='slide_img' src={logo}  alt='' />
    </div>
    <div>
    <img className='slide_img' src={logo}  alt='' />
    </div>
  </Carousel>
    );
};

export default Slide;