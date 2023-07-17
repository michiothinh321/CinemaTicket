import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ticket as ticketAPI,
  chair as chairAPI,
  detailTicket as detailTicketAPI,
} from "../../API";
import "./PaymentContent.scss";
const PaymentContent = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idRoom = urlParams.get("idRoom");
  const idShowTime = urlParams.get("idShowTime");
  const idFilm = urlParams.get("idFilm");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [chairs, setChairs] = useState([]);
  const [details, setDetails] = useState([]);
  // const [seconds, setSeconds] = useState(59);
  // const [minutes, setMinutes] = useState(2);
  // const timer = () => setSeconds((seconds) => seconds - 1);

  useEffect(() => {
    (async () => {
      await getTicket();
    })();
  }, []);
  const getTicket = async () => {
    try {
      const result = await ticketAPI.getTicket({ email: user.email });
      const result1 = await chairAPI.getChair({ idRoom });

      setTickets(result.data);
      setChairs(result1.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tickets) {
      (async () => {
        await getDetail();
      })();
    }
  }, [tickets]);
  const getDetail = async () => {
    try {
      const result = await detailTicketAPI.getDetailTicket({
        idShowTime,
      });
      setDetails(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // // useEffect(() => {
  // //   if (seconds <= 0 && minutes > 0) {
  // //     setMinutes((minutes) => minutes - 1);
  // //     setSeconds(59);
  // //   }
  // //   if (minutes <= 0 && seconds <= 0) {
  // //     navigate("/");
  // //     return;
  // //   }

  // //   const id = setInterval(timer, 1000);
  // //   return () => clearInterval(id);
  // // }, [seconds, minutes]);
  // const handleAddBill = async (e) => {
  //   try {
  //     ticket.map(async (ticket) => {
  //       if (!ticket.checkout) {
  //         const resultTicket = await ticketAPI.checkoutTicket({
  //           id: ticket._id,
  //         });
  //       }
  //     });
  //     chair.map(async (chair) => {
  //       if (!chair.checkout) {
  //         const resultChair = await chairAPI.checkoutChair({
  //           id: chair._id,
  //         });
  //       }
  //     });
  //     detail.map(async (e) => {
  //       ticket.map(async (value) => {
  //         if (!e.checkout && !value.checkout) {
  //           const details = {
  //             idTicket: (e.idTicket = value._id),
  //             id: e._id,
  //           };
  //           const resultDetail = await detailTicketAPI.editDetailTicket({
  //             details,
  //           });
  //         }
  //       });
  //     });
  //     // if (result.status === 200) {
  //     //   api.open({
  //     //     type: "success",
  //     //     message: "Add Film successfully.",
  //     //   });
  //     // }
  //   } catch (error) {
  //     // api.open({
  //     //   type: "error",
  //     //   message: "Film is exsist.",
  //     // });
  //     console.log({ error });
  //   }
  // };
  // const handleDeleteTicket = async () => {
  //   ticket.map(async (ticket) => {
  //     if (!ticket.checkout) {
  //       const resultTicket = await ticketAPI.deleteTicket({
  //         id: ticket._id,
  //       });
  //     }
  //   });
  //   chair.map(async (chair) => {
  //     if (!chair.checkout) {
  //       const resultChair = await chairAPI.deleteChair({
  //         id: chair._id,
  //       });
  //     }
  //   });
  //   detail.map(async (e) => {
  //     ticket.map(async (value) => {
  //       if (!e.checkout && !value.checkout) {
  //         const resultDetail = await detailTicketAPI.deleteDetailTicket({
  //           id: e._id,
  //         });
  //       }
  //     });
  //   });
  // };
  return (
    <>
      {tickets.map((ticket) => {
        if (!ticket.checkout) {
          return (
            <div>
              <div className="order-title">
                <div className="order-wrap">
                  <div className="order-overview">
                    <h2>
                      <strong>Tên phim: </strong>
                      <br></br>
                      <span>{ticket.nameFilm}</span>
                    </h2>
                    <ul className="about-ticket">
                      <li>
                        <p className="caption">Chọn suất chiếu</p>
                        <p className="value">{ticket.timeStart}</p>
                      </li>
                      <li>
                        <p className="caption">Ngày</p>
                        <p className="value">
                          {ticket.date
                            ?.slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </p>
                      </li>
                      <li>
                        <p className="caption">Số lượng</p>
                        <p className="value">NAME</p>
                      </li>
                      <li>
                        <p className="caption">Tổng tiền</p>
                        <p className="value">
                          {ticket.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </li>
                    </ul>
                    <ul className="about-seat">
                      <li>Số ghế</li>
                      <li className="seat-number">
                        {ticket.chairs.join(", ")}
                      </li>
                    </ul>
                  </div>
                  {/* <div className="order-clock">
              <span className="title">Thời gian giữ ghế</span>
            </div> */}
                </div>
              </div>
              <div className="order-content">
                <div className="cinema-name">
                  <h2>CINEMA STU</h2>
                </div>
                <div className="final-content">
                  <div className="final-confirm">
                    <p>
                      Cảm ơn quý khách đã đến với <strong>Cinestar</strong> !
                      <br /> Xin quý khách vui lòng kiểm tra lại thông tin đặt
                      vé{" "}
                    </p>
                    <div className="confirm-box">
                      <div className="confirm-film">
                        <div className="confirm-film-pic">
                          <img
                            src="https://cinestar.com.vn/pictures/Cinestar/07-2023/insidious-quy-quyet-cua-do-vo-dinh.jpg"
                            alt=""
                          />
                        </div>
                        <div className="confirm-film-text">
                          <h3>QUỶ QUYỆT: CỬA ĐỎ VÔ ĐỊNH (T16)</h3>
                          <p>
                            Ngày chiếu: <strong>17/07/2023</strong>
                          </p>
                          <p>
                            Xuất chiếu: <strong>19:30</strong>
                          </p>
                          <p>
                            <span className="icon-"></span>
                          </p>
                        </div>
                      </div>
                      <div className="confirm-ticket">
                        <table
                          style={{
                            width: "100%",
                            backgroundColor: "#f2f2f2",
                          }}
                        >
                          <tr>
                            <th
                              rowSpan="2"
                              style={{
                                border: "1px solid black",
                                width: "150px",
                                height: "30px",
                              }}
                            >
                              Ghế
                            </th>
                          </tr>
                          <tr>
                            {details.map((detail, index) => {
                              return (
                                <td
                                  key={index}
                                  style={{
                                    border: "1px solid black",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "5px 12px",
                                    fontWeight: "bolder",
                                    margin: "2px 0",
                                  }}
                                >
                                  <div>{detail.detail.chair}</div>
                                  <div>{detail.detail.price}</div>
                                </td>
                              );
                            })}
                          </tr>
                        </table>
                      </div>
                      <div className="confirm-total"></div>
                      <div className="confirm-total-pay">
                        <div className="confirm-mark">
                          Số tiền cần thanh toán:
                        </div>
                        <div className="confirm-value">
                          <span className="cls-coupon-total">
                            {ticket.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="final-form"></div>
                </div>
              </div>
            </div>
          );
        }
      })}

      {/* <div className="payment">
        <div className="payment_left">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>THANH TOÁN</h2>
            <h2>
              THỜI GIAN:{" "}
              {`${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`}
            </h2>
          </div>
          <div className="payment_left_info">
            <div className="payment_left_text">
              <p>Hình thức thanh toán</p>
            </div>
            <div>
              <div className="payment_left_input">
                <p>
                  <select>
                    <option>Chọn loại thẻ</option>
                    <option>Ví MoMo</option>
                    <option>Tiền Mặt</option>
                  </select>
                </p>

                <div className="payment_btn_main">
                  <Link
                    to={`/order?idRoom=${idRoom}&idShowTime=${idShowTime}&idFilm=${idFilm}`}
                  >
                    <button
                      className="pay_btn_main"
                      onClick={handleDeleteTicket}
                    >
                      QUAY LẠI
                    </button>
                  </Link>
                  {ticket.map((ticket) => {
                    if (!ticket.checkout) {
                      return (
                        <Link
                          key={ticket._id}
                          to={`/paysuccess?idTicket=${ticket._id}`}
                        >
                          <button
                            className="pay_btn_main"
                            onClick={() => handleAddBill(ticket._id)}
                          >
                            THANH TOÁN
                          </button>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {ticket.map((ticket, index) => {
          if (!ticket.checkout) {
            return (
              <div key={index} className="payment_right">
                <div className="payment_right_img">
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
            );
          }
        })}
      </div> */}
    </>
  );
};

export default PaymentContent;
