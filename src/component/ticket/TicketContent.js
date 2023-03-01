import clsx from "clsx";
import React, { useState, useEffect } from "react";
import styles from "./TicketContent.module.scss";
import { Link } from "react-router-dom";

const TicketContent = () => {
  const [ticket, setTicket] = useState({});
  const [showTime, setShowTime] = useState();
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [graphic, setGraphic] = useState([]);

  useEffect(() => {
    setTicket({
      id: 1,
      thumb:
        "http://localhost:3000/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
      name: "A",
      time: 120,
      directors: ["Tony", "Nami"],
      genres: ["hanhdong", "tinhcam"],
      actors: ["Danny", "Hana"],
      date: "2023-02-14",
      content: "ABC",
      graphics: ["2D", "3D", "IMAX"],
    });
  }, []);

  useEffect(() => {
    setCityList([
      {
        name: "Tp. Hồ Chí Minh",
        code: "HCM",
      },
      {
        name: "Đồng Nai",
        code: "DN",
      },
      {
        name: "Long An",
        code: "LA",
      },
      {
        name: "Bình Dương",
        code: "BD",
      },
      {
        name: "Tiền Giang",
        code: "TG",
      },
    ]);
  }, []);

  useEffect(() => {
    setCity(cityList[0]);
  }, [cityList]);

  const handleShowTime = (e) => {
    setShowTime(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleGraphicsChange = (e) => {
    setGraphic(e.target.value);
  };
  console.log(graphic);

  return (
    <>
      <div className={clsx(styles.ticket_content)}>
        <div className={clsx(styles.ticket_left)}>
          <div className={clsx(styles.ticket_descript1)}>
            <div>
              <img src={ticket.thumb} alt="" />
            </div>
            <div className={clsx(styles.ticket_title)}>
              <h3>{ticket.name}</h3>
              <p>
                <span>Time: </span>
                <span>{ticket.time}'</span>
              </p>
              <p>Đạo diễn: {ticket.directors?.join(", ")}</p>
              <p>Thể loại: {ticket.genres?.join(", ")}</p>
              <p>Diễn viên: {ticket.actors?.join(", ")}</p>
              <p>Ngày công chiếu: {ticket.date}</p>
            </div>
          </div>
          <div className={clsx(styles.ticket_descript2)}>
            <h4>Nội Dung Phim</h4>
            <p>{ticket.content}</p>
          </div>
        </div>
        <div className={clsx(styles.ticket_right)}>
          <h2>LỊCH CHIẾU</h2>
          <div className={clsx(styles.ticket_select)}>
            <input
              value={showTime || ""}
              type="date"
              onChange={handleShowTime}
            ></input>
            <select onChange={handleCityChange}>
              {cityList.map((city) => {
                return (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                );
              })}
            </select>
            <select onChange={handleGraphicsChange}>
              {ticket.graphics?.map((graphic) => {
                return <option key={graphic}>{graphic}</option>;
              })}
            </select>
          </div>
          <div className={clsx(styles.ticket_time)}>
            <div>
              <h3>Cinema Tân Bình</h3>
            </div>
            <div className={clsx(styles.flex_center)}>
              <div className={clsx(styles.ticket_time_title)}>
                <h4>2D</h4>
              </div>
              <div className={clsx(styles.ticket_time_button)}>
                <button>
                  <Link to="/order" className={clsx(styles.button_order)}>
                    09:30
                  </Link>
                </button>
                <button>10:30</button>
                <button>11:30</button>
                <button>12:30</button>
                <button>13:30</button>
                <button>14:30</button>
                <button>15:30</button>
                <button>16:30</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketContent;
