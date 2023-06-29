import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { notification } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ticket as ticketAPI,chair as chairAPI} from "../../API";
import styles from "./PaymentContent.module.scss";
const PaymentContent = () => {
  const [api, contextHolder] = notification.useNotification();
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idRoom = urlParams.get("idRoom");
  const navigate = useNavigate();
  const [ticket, setTicket] = useState([]);
  const [chair,setChair] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(ticket){
      (async () => {
        await getTicket();
      })();
    }
  }, []);
  const getTicket = async () => {
    try {
      const result = await ticketAPI.getTicket({ email: user.email });
      const result1 = await chairAPI.getChair({idRoom})
      setTicket(result.data);
      setChair(result1.data)
    } catch (error) {
      console.log(error);
    }
  };
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(2);
  const timer = () => setSeconds(seconds=>seconds - 1);
  useEffect(
      () => {
          if (seconds <= 0 && minutes >0) {
              setMinutes((minutes)=> minutes-1)
              setSeconds(60)
          }
          if(minutes <=0 && seconds<=0){
            navigate("/")
            return;
            }

          const id = setInterval(timer, 1000);
          return () => clearInterval(id);
      },
      [seconds,minutes]
  );
  const handleAddBill = async (e) => {
    try {
      ticket.map(async (ticket)=>{
        if( !ticket.checkout){
          const resultTicket = await ticketAPI.checkoutTicket({
            id: ticket._id,
          });
        }
      })
      chair.map(async (chair)=>{
        if(!chair.checkout){
          const resultChair = await chairAPI.checkoutChair({
            id: chair._id,
          });
        }
      })

      // if (result.status === 200) {
      //   api.open({
      //     type: "success",
      //     message: "Add Film successfully.",
      //   });
      // }
    } catch (error) {
      // api.open({
      //   type: "error",
      //   message: "Film is exsist.",
      // });
      console.log({error});
    }
  };
  return (
    <>
      <div className={clsx(styles.payment)}>
        <div className={clsx(styles.payment_left)}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>THANH TOÁN</h2>
            <h2>THỜI GIAN: {`${minutes<10?"0"+minutes:minutes}:${seconds<10?"0"+seconds:seconds}`}</h2>
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
          {ticket.map((ticket,index)=>{
            if(!ticket.checkout){
              return(
                <div key={index} className={clsx(styles.payment_right)}>
          <div className={clsx(styles.payment_right_img)}>
            <img src={ticket.picture} alt="" />
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
              )
            }
          })}
      </div>
    </>
  );
};

export default PaymentContent;
