import clsx from 'clsx';
import React from 'react';
import styles from './OrderContent.module.scss'
import logo from '../image/jujutsu-kaisen-chu-thuat-hoi-chien.png'
import { Link } from 'react-router-dom';
const OrderContent = () => {
    return (
        <>
            <div className={clsx(styles.order)}>
                <div className={clsx(styles.order_left)}>
                    <div>
                        <h2>CHỌN GHẾ:</h2>
                    </div>
                    <div className={clsx(styles.order_choice)}>
                        <ul >
                            <div className={clsx(styles.width)}>
                            <li>I</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>I</li>
                            </div>
                        </ul>
                        <ul >
                            <div className={clsx(styles.width)}>
                            <li>I</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>I</li>
                            </div>
                        </ul>
                        <ul >
                            <div className={clsx(styles.width)}>
                            <li>I</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>I</li>
                            </div>
                        </ul>
                        <ul >
                            <div className={clsx(styles.width)}>
                            <li>I</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>I</li>
                            </div>
                        </ul>
                        <ul >
                            <div className={clsx(styles.width)}>
                            <li>I</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>4</li>
                            <li>I</li>
                            </div>
                        </ul>
                        <div className={clsx(styles.order_screen)}>
                            <p>Màn hình</p>
                        </div>
                        <div className={clsx(styles.order_note)}>
                            <span>Ghế đã chọn</span>
                            <span>Ghế đã bán</span>
                            <span>Có thể chọn</span>
                            <span>Không thể chọn</span>
                        </div>
                    </div>
                </div> 
                <div className={clsx(styles.order_right)}>
                    <div className={clsx(styles.order_right_img)}>
                        <img src={logo} alt=''/>
                        <h2>Chú thuật hồi chiến</h2>
                    </div>
                    <div>
                        <p>Rạp: Cinema Tân Bình | RAP 1</p>
                        <p>Suất chiếu: 13:30 | Thứ bảy, 18/02/2023</p>
                        <p>Combo: </p>
                        <p>Ghế: </p>
                        <h2>Tổng: 90.000 VNĐ</h2>
                    </div>
                    <div className={clsx(styles.order_right_button)}>
                        <button>QUAY LẠI</button>
                        <button><Link to='/payment'>TIẾP TỤC</Link></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderContent;