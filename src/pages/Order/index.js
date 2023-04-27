import clsx from "clsx";
import React from "react";
import styles from "./OrderContent.module.scss";
import logo from "../../component/image/jujutsu-kaisen-chu-thuat-hoi-chien.png";
import { Link } from "react-router-dom";
const Order = () => {
  return (
    <>
      <div className={clsx(styles.order)}>
        <div className={clsx(styles.order_left)}>
          <div className={clsx(styles.order_choice)}>
            <div className={clsx(styles.order_screen)}>
              <p>Màn hình</p>
            </div>
            <ul>
              <div className={clsx(styles.width)}>
                <ul>
                  <li>A0</li>
                  <li>A1</li>
                  <li>A2</li>
                  <li>A3</li>
                  <li>A4</li>
                  <li>A5</li>
                  <li>A6</li>
                  <li>A7</li>
                  <li>A8</li>
                  <li>A9</li>
                </ul>
                <ul>
                  <li>A0</li>
                  <li>A1</li>
                  <li>A2</li>
                  <li>A3</li>
                  <li>A4</li>
                  <li>A5</li>
                  <li>A6</li>
                  <li>A7</li>
                  <li>A8</li>
                  <li>A9</li>
                </ul>
              </div>
            </ul>
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
            <img src={logo} alt="" />
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
            <Link to="/ticket">
              <button className={clsx(styles.order_btn_main)}>QUAY LẠI</button>
            </Link>
            <Link to="/payment">
              <button className={clsx(styles.order_btn_main)}>TIẾP TỤC</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
