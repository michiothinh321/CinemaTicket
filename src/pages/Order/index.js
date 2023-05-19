import clsx from "clsx";
import { room as roomAPI, showtime as showtimeAPI } from "../../API";
import React, { useEffect, useState } from "react";
import styles from "./OrderContent.module.scss";
import logo from "../../component/image/jujutsu-kaisen-chu-thuat-hoi-chien.png";
import { Link } from "react-router-dom";
const Order = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idRoom = urlParams.get("idRoom");
  const idFilm = urlParams.get("idFilm");
  const [film, setFilm] = useState([]);
  const [movie, setMovie] = useState({});

  const arrayString = [
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
      const result = await showtimeAPI.getShowtime({ idFilm });
      setFilm(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const arr = [];

  for (let i = 0; i < movie.columns; i++) {
    for (let j = 0; j < movie.rows; j++) {
      arr.push(`${arrayString[i]}${j}`);
    }
  }

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
                <ul></ul>
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
            <p>
              Rạp: {`${film.nameTheater}`} | Phòng: {`${film.nameRoom}`}
            </p>
            <p>
              Suất chiếu: {`${film.timeStart}`} | {`${film.date}`}
            </p>
            <p>Ghế: </p>
            <h2>Tổng: </h2>
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
