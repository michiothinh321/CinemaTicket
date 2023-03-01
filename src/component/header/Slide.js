import React from 'react';
import styles from './Slide.module.scss';
import clsx from 'clsx';
import logo from '../image/one-piece.jpg'

const Slide = () => {
    return (
        <div>
                <img className={clsx(styles.slide_img)} src={logo} alt= ''/>
                <div className={clsx(styles.slide_icon)}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
        </div>
    );
};

export default Slide;