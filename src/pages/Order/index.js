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
          <div>
            <h2>CHỌN GHẾ:</h2>
          </div>
          <div className={clsx(styles.order_choice)}>
            <ul>
              <div className={clsx(styles.width)}>
                <li>O</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>O</li>
              </div>
            </ul>
            <ul>
              <div className={clsx(styles.width)}>
                <li>N</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>N</li>
              </div>
            </ul>
            <ul>
              <div className={clsx(styles.width)}>
                <li>M</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>M</li>
              </div>
            </ul>
            <ul>
              <div className={clsx(styles.width)}>
                <li>L</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>L</li>
              </div>
            </ul>
            <ul>
              <div className={clsx(styles.width)}>
                <li>K</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>K</li>
              </div>
            </ul>
            <ul>
              <div className={clsx(styles.width)}>
                <li>I</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
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
