import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../component/image/jujutsu-kaisen-chu-thuat-hoi-chien.png";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { room as roomAPI, showtime as showtimeAPI,ticket as ticketAPI,user as userAPI } from "../../API";
import styles from "./PaymentContent.module.scss";
const PaymentContent = () => {
  const [ticket,setTicket] =useState("")
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      await getTicket();
    })();
  }, []);
  const getTicket = async () => {
    try {
      const result = await ticketAPI.getTicket({ email:user.email });
      setTicket(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(ticket);
  return (
    <>
      <div className={clsx(styles.payment)}>
        <div className={clsx(styles.payment_left)}>
          <div>
            <h2>THANH TOÁN</h2>
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
                    <option>Tiền Mặt</option>
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
            <img src={ticket.picture} alt="" />
            <h2>{ticket.nameFilm}</h2>
          </div>
          <div>
            <p>Rạp: {ticket.nameTheater} | {ticket.nameRoom}</p>
            <p>Suất chiếu: {ticket.timeStart} |{ticket.date}</p> 
            <p>Ghế: {ticket.chairs?.join(", ")}</p>
            <h2>Tổng: {Number(ticket.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentContent;
