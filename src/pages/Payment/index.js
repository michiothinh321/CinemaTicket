import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ticket as ticketAPI, bill as billAPI } from "../../API";
import styles from "./PaymentContent.module.scss";
const PaymentContent = () => {
  const [api, contextHolder] = notification.useNotification();

  const [ticket, setTicket] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      await getTicket();
    })();
  }, []);
  const getTicket = async () => {
    try {
      const result = await ticketAPI.getTicket({ email: user.email });
      setTicket(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(2);

  // const timer = () => setSeconds(seconds=>seconds - 1);

  // useEffect(
  //     () => {
  //         if (seconds <= 0 && minutes >0) {
  //             setMinutes((minutes)=> minutes-1)
  //             setSeconds(60)
  //         }
  //         if(minutes <=0 && seconds<=0){

  //           return;
  //           }

  //         const id = setInterval(timer, 50);
  //         return () => clearInterval(id);
  //     },
  //     [seconds,minutes]
  // );

  const handleAddBill = async (e) => {
    try {
      const result = await billAPI.addBill({
        idTicket: ticket._id,
        email: ticket.email,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Add Film successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Film is exsist.",
      });
    }
  };
  return (
    <>
      <div className={clsx(styles.payment)}>
        <div className={clsx(styles.payment_left)}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>THANH TOÁN</h2>
            <h2>THỜI GIAN: {`${minutes}:${seconds}`}</h2>
          </div>
          <div className={clsx(styles.payment_left_info)}>
            <div className={clsx(styles.payment_left_text)}>
              <p>Hình thức thanh toán</p>
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

                <div className={clsx(styles.payment_btn_main)}>
                  <Link to="/order">
                    <button className={clsx(styles.pay_btn_main)}>
                      QUAY LẠI
                    </button>
                  </Link>
                  <Link to="/paysuccess">
                    <button
                      className={clsx(styles.pay_btn_main)}
                      onClick={handleAddBill}
                    >
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
            <img src="" alt="" />
            <h2>{ticket.nameFilm}</h2>
          </div>
          <div>
            <p>
              Rạp: {ticket.nameTheater} | {ticket.nameRoom}
            </p>
            <p>
              Suất chiếu: {ticket.timeStart} |
              {ticket.date?.slice(0, 10).split("-").reverse().join("-")}
            </p>
            <p>Ghế: {ticket.chairs?.join(", ")}</p>
            <h2>
              Tổng:{" "}
              {Number(ticket.price).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentContent;
