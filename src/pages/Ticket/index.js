import React, { useState, useEffect } from "react";
import "./ticket.scss";
import { Link } from "react-router-dom";
import { movie as movieAPI, showtime as showtimeAPI } from "../../API/index";
import Slide from "./../../component/header/Slide";
import CartContent from "./../../component/cartcontent/CartContent";
const Ticket = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [movie, setMovie] = useState({});
  const [film, setFilm] = useState([]);
  const [open, setOpen] = useState(false);
  const [nameTheaters, setNameTheaters] = useState("");

  useEffect(() => {
    if (idFilm) {
      (async () => {
        await getMovie();
      })();
    }
  }, [idFilm]);

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
  useEffect(() => {
    (async () => {
      await getShowtime();
    })();
  }, []);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.getShowtime({ idFilm });
      setFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const groupedData = film.reduce((groups, item) => {
    const { nameTheater, date } = item;
    if (!groups[nameTheater]) {
      groups[nameTheater] = [];
    }

    groups[nameTheater].push({ item, date });

    return groups;
  }, {});
  Object.entries(groupedData).map(([nameTheater, items]) => {
    items.map((item) => {
      if (
        parseInt(item.item.date.slice(5, 7)) === new Date().getMonth() + 1 &&
        parseInt(item.item.date.slice(8, 10)) === new Date().getDate()
      ) {
        if (
          parseInt(item.item.timeStart.slice(0, 2)) === new Date().getHours() &&
          parseInt(item.item.timeStart.slice(3, 5)) - new Date().getMinutes() >
            20
        ) {
          console.log(item.item);
        }
      } else {
        console.log("b");
      }
    });
  });
  console.log(film);
  return (
    <>
      <Slide />
      <CartContent />
      <div className="schedule-detail-content">
        <div className="schedule-detail-wrap">
          <div className="searh-block">
            <div className="select-list">
              <div className="select-header">
                <select onChange={(e) => setNameTheaters(e.target.value)}>
                  <option>Chọn rạp</option>
                  {Object.entries(groupedData).map(([nameTheater, items]) => (
                    <option value={nameTheater} key={nameTheater}>
                      {nameTheater}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="film-block">
            <div className="film-item t-3d">
              <div className="film-item-pic">
                <img src={movie.picture} alt={movie.nameFilm} />
              </div>
              <div className="film-item-txt">
                <h3>TÊN PHIM: {movie.nameFilm}</h3>
                <div className="schedule-block">
                  <div className="schedule-block-load">
                    {
                      <div className="container">
                        {Object.entries(groupedData).map(
                          ([nameTheater, items]) =>
                            nameTheater === nameTheaters ? (
                              <div key={nameTheater}>
                                <div
                                  className="cinema-item"
                                  cine-id="667c7727-857e-4aac-8aeb-771a8f86cd14"
                                >
                                  <h4>Rạp chiếu phim: {nameTheater}</h4>
                                </div>
                                <div className="row-date"></div>
                                <div style={{ display: "flex" }}>
                                  {items.map((item, index) =>
                                    parseInt(item.item.date.slice(5, 7)) >=
                                      new Date().getMonth() + 1 ||
                                    parseInt(item.item.date.slice(8, 10)) >=
                                      new Date().getDate() ? (
                                      <div
                                        key={index}
                                        className="cinema-item"
                                        cine-id="667c7727-857e-4aac-8aeb-771a8f86cd14"
                                      >
                                        <div className="row">
                                          <div className="row-hour">
                                            <ul>
                                              <Link
                                                to={`/order?timeStart=${item.item.timeStart}&idRoom=${item.item.idRoom}&idFilm=${item.item.idFilm}&idShowTime=${item.item._id}`}
                                              >
                                                {parseInt(
                                                  item.item.date.slice(5, 7)
                                                ) ===
                                                  new Date().getMonth() + 1 &&
                                                parseInt(
                                                  item.item.date.slice(8, 10)
                                                ) === new Date().getDate() ? (
                                                  parseInt(
                                                    item.item.timeStart.slice(
                                                      0,
                                                      2
                                                    )
                                                  ) === new Date().getHours() &&
                                                  parseInt(
                                                    item.item.timeStart.slice(
                                                      3,
                                                      5
                                                    )
                                                  ) -
                                                    new Date().getMinutes() >
                                                    20 ? (
                                                    <li>{`${
                                                      item.item.timeStart
                                                    } - ${item.item.date
                                                      .slice(5, 10)
                                                      .split("-")
                                                      .reverse()
                                                      .join("/")} (${
                                                      item.item.animation
                                                    })`}</li>
                                                  ) : (
                                                    ""
                                                  )
                                                ) : (
                                                  <li>{`${
                                                    item.item.timeStart
                                                  } - ${item.item.date
                                                    .slice(5, 10)
                                                    .split("-")
                                                    .reverse()
                                                    .join("/")} (${
                                                    item.item.animation
                                                  })`}</li>
                                                )}
                                              </Link>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
