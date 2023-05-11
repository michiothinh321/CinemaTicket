import React, { useState, useEffect } from "react";
import "./ticket.scss";
import { Link } from "react-router-dom";
import { movie as movieAPI } from "../../API/index";
const Ticket = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  console.log(idFilm);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      await getMovie();
    })();
  }, []);

  const getMovie = async () => {
    try {
      const result = await movieAPI.getMovie({
        idFilm,
      });
      setMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ticket_content">
        <div className="ticket_left">
          <div className="ticket_descript1">
            <div>
              <img src={movie.picture} alt="?" />
            </div>
            <div className="ticket_title">
              <h3>{movie.nameFilm}</h3>
              <p>
                <span>Thời gian: </span>
                <span>{movie.time} phút</span>
              </p>
              <p>Đạo diễn: {movie.directors}</p>
              <p>Thể loại: {movie.genres?.join(", ")}</p>
              <p>Diễn viên: {movie.actors}</p>
              <p>
                Ngày công chiếu: {movie.date?.slice(0, 10).split("-").join("-")}
              </p>
            </div>
          </div>
          <div className="ticket_descript2">
            <h4>Nội Dung Phim</h4>
            <p>{movie.content}</p>
          </div>
        </div>
        <div className="ticket_right">
          <h2>LỊCH CHIẾU</h2>
          <div className="ticket_select">
            <input value={""} type="date"></input>
            <select>
              {/* {cityList.map((city) => {
                return (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                );
              })} */}
            </select>
            <select>
              {/* {ticket.graphics?.map((graphic) => {
                return <option key={graphic}>{graphic}</option>;
              })} */}
            </select>
          </div>
          <div className="ticket_time">
            <div>
              <h3>Cinema Tân Bình</h3>
            </div>
            <div className="flex_center">
              <div className="ticket_time_title">
                <h4>2D</h4>
              </div>
              <div className="ticket_time_button">
                <Link to="/order">
                  <button className="button_order">09:00</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
