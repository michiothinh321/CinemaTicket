import React from "react";
import logo from "../../component/image/jujutsu-kaisen-chu-thuat-hoi-chien.png";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./PaymentContent.module.scss";
const PaymentContent = () => {
  return (
    <>
      <div className={clsx(styles.payment)}>
        <div className={clsx(styles.payment_left)}>
          <div>
            <h2>VUI LÒNG THANH TOÁN</h2>
          </div>
          <div className={clsx(styles.payment_left_info)}>
            <div className={clsx(styles.payment_left_text)}>
              <p>Hình thức thanh toán</p>
              <p>Họ và tên</p>
              <p>Email</p>
              <p>Số điện thoại</p>
            </div>
            <div>
              <div className={clsx(styles.payment_left_input)}>
                <p>
                  <select>
                    <option>Chọn loại thẻ</option>
                    <option>Ví MoMo</option>
                    <option>ZaloPay</option>
                    <option>VNPAY</option>
                    <option>ShopeePay</option>
                  </select>
                </p>
                <p>
                  <input type="text"></input>
                </p>
                <p>
                  <input type="email"></input>
                </p>
                <p>
                  <input type="tel"></input>
                </p>
                <div className={clsx(styles.payment_btn_main)}>
                  <Link to="/order">
                    <button className={clsx(styles.pay_btn_main)}>
                      QUAY LẠI
                    </button>
                  </Link>
                  <Link to="/">
                    <button className={clsx(styles.pay_btn_main)}>
                      THANH TOÁN
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.payment_right)}>
          <div className={clsx(styles.payment_right_img)}>
            <img src={logo} alt="" />
            <h2>Chú thuật hồi chiến</h2>
          </div>
          <div>
            <p>Rạp: Cinema Tân Bình | RAP 1</p>
            <p>Suất chiếu: 13:30 | Thứ bảy, 18/02/2023</p>
            <p>Combo: </p>
            <p>Ghế: F5</p>
            <h2>Tổng: 90.000 VNĐ</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentContent;
