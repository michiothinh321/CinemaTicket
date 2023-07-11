import { useSelector } from "react-redux";
import {
  room as roomAPI,
  showtime as showtimeAPI,
  ticket as ticketAPI,
  chair as chairAPI,
  detailTicket as detailTicketAPI,
} from "../../API";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import "./OrderContent.scss";
import { Link, useNavigate } from "react-router-dom";
const Order = () => {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idRoom = urlParams.get("idRoom");
  const idFilm = urlParams.get("idFilm");
  const idShowTime = urlParams.get("idShowTime");
  const [film, setFilm] = useState([]);
  const [movie, setMovie] = useState({});
  const [enable, setEnable] = useState([]);
  const [numberChair, setNumberChair] = useState([]);
  const [priceFilm, setPriceFilm] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const [chair, setChair] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(2);
  const [detailTicket, setDetailTicket] = useState([]);
  const timer = () => setSeconds((seconds) => seconds - 1);
  useEffect(() => {
    if (seconds <= 0 && minutes > 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    }
    if (minutes <= 0 && seconds <= 0) {
      navigate("/");
      return;
    }

    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [seconds, minutes]);
  useEffect(() => {
    (async () => {
      await getMovie();
    })();
  }, []);
  const getMovie = async () => {
    try {
      const result = await roomAPI.getId({ idRoom });
      setMovie(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await getShowtime();
    })();
  }, []);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.showTime({ idShowTime });
      setFilm(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddChairs = async (e) => {
    try {
      const result = await ticketAPI.addTicket({
        price: priceFilm,
        idShowTime,
        chairs: numberChair,
        email: user.email,
        date: new Date(),
      });

      const result1 = await chairAPI.addChair({
        idRoom,
        numberChair,
      });

      detailTicket.map(async (detail) => {
        const result2 = await detailTicketAPI.addDetailTicket({
          idTicket: "",
          idShowTime,
          email: user.email,
          date: new Date(),
          detail,
        });
      });
      // if (result.status === 200) {
      //   api.open({
      //     type: "success",
      //     message: "Add Ticket successfully.",
      //   });
      // }
    } catch (error) {
      //  api.open({
      //   type: "error",
      //   message: "Ticket is exsist.",
      // });
      console.log({ error });
    }
  };

  useEffect(() => {
    (async () => {
      await getChair();
    })();
  }, []);
  const getChair = async () => {
    try {
      const result = await chairAPI.getChair({ idRoom });
      setChair(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const arr = new Array();
  for (let i = 0; i < movie.columns; i++) {
    arr[i] = new Array();
    for (let j = 0; j < movie.rows; j++) {
      arr[i].push({
        numberChair: `${alphabet[i]}${j}`,
        status: false,
        vip: false,
      });
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i >= 3 && i < arr.length - 3) {
        arr[i][j].vip = true;
      }
      for (let ij = 0; ij < chair.length; ij++) {
        for (let index = 0; index < chair[ij].numberChair.length; index++) {
          if (arr[i][j].numberChair === chair[ij].numberChair[index]) {
            arr[i][j].status = true;
          }
        }
      }
    }
  }
  const handleSetChair = (e, chair) => {
    if (e.target.className !== "disabled") {
      if (!enable.includes(e.target.innerHTML)) {
        if (!chair.vip) {
          setEnable((pre) => [...pre, e.target.innerHTML]);
          e.currentTarget.style.backgroundColor = "#f71708";
          e.currentTarget.style.color = "white";
          setNumberChair((pre) => [...pre, e.target.innerHTML]);
          setPriceFilm((prev) => +film.price + prev);
          setDetailTicket((pre) => [
            ...pre,
            {
              price: film.price,
              chair: e.target.innerHTML,
            },
          ]);
        } else {
          setEnable((pre) => [...pre, e.target.innerHTML]);
          e.currentTarget.style.backgroundColor = "#f71708";
          e.currentTarget.style.color = "white";
          setNumberChair((pre) => [...pre, e.target.innerHTML]);
          setPriceFilm((prev) => +film.price + prev + parseInt(film.priceVip));
          setDetailTicket((pre) => [
            ...pre,
            {
              price: +film.price + parseInt(film.priceVip),
              chair: e.target.innerHTML,
            },
          ]);
        }
      } else {
        if (!chair.vip) {
          setEnable(
            enable.filter((item) => !e.target.innerHTML.includes(item))
          );
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "black";
          setNumberChair(
            enable.filter((item) => !e.target.innerHTML.includes(item))
          );
          setPriceFilm((prev) => prev - parseInt(film.price));
          setDetailTicket(
            detailTicket.filter(
              (item) => !e.target.innerHTML.includes(item.chair)
            )
          );
        } else {
          setEnable(
            enable.filter((item) => !e.target.innerHTML.includes(item))
          );
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "black";
          setNumberChair(
            enable.filter((item) => !e.target.innerHTML.includes(item))
          );
          setPriceFilm(
            (prev) => prev - parseInt(film.price) - parseInt(film.priceVip)
          );
          setDetailTicket(
            detailTicket.filter(
              (item) => !e.target.innerHTML.includes(item.chair)
            )
          );
        }
      }
    }
  };
  return (
    <>
      {contextHolder}

      <div className="order">
        <div className="order_left">
          <h2>
            THỜI GIAN:{" "}
            {`${minutes < 10 ? "0" + minutes : minutes}:${
              seconds < 10 ? "0" + seconds : seconds
            }`}
          </h2>
          <div className="order_choice">
            <div className="order_screen">
              <p>Màn hình</p>
            </div>
            <ul>
              <div>
                {arr.map((chairs, index) => {
                  return (
                    <ul key={index}>
                      {chairs.map((chair, index) => {
                        if (chair.vip) {
                          return (
                            <li
                              style={{ border: "1px solid #f71708" }}
                              key={index}
                              className={chair.status ? "disabled" : ""}
                              onClick={(e) => handleSetChair(e, chair)}
                            >
                              {chair.numberChair}
                            </li>
                          );
                        } else {
                          return (
                            <li
                              key={index}
                              className={chair.status ? "disabled" : ""}
                              onClick={(e) => handleSetChair(e, chair)}
                            >
                              {chair.numberChair}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  );
                })}
              </div>
            </ul>
            <div className="order_note">
              <span>Checked</span>
              <span>Đã chọn</span>
              <span>Thường</span>
              <span>Vip</span>
            </div>
          </div>
        </div>
        <div className="order_right">
          <div className="order_right_img">
            <img src={film.picture} alt="Fail" />
            <h2>{film.nameFilm}</h2>
          </div>
          <div>
            <p>
              Rạp: {`${film.nameTheater}`} | {`${film.nameRoom}`}
            </p>
            <p>Suất chiếu: {`${film.timeStart}`}</p>
            <p>
              Ngày chiếu:{" "}
              {`${film.date?.slice(0, 10).split("-").reverse().join("-")}`}
            </p>

            <p>Ghế: {numberChair.join(", ")} </p>
            <h2>
              Tổng:{" "}
              {priceFilm.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </h2>
          </div>
          <div className="order_right_button">
            <Link to="/ticket">
              <button className="order_btn_main">QUAY LẠI</button>
            </Link>
            <Link
              to={`/payment?idRoom=${film.idRoom}&idFilm=${film.idFilm}&idShowTime=${idShowTime}`}
            >
              <button className="order_btn_main" onClick={handleAddChairs}>
                TIẾP TỤC
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
