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

  // const cats = film.reduce((catsSoFar, { date, nameTheater, timeStart }) => {
  //   if (!catsSoFar[nameTheater]) catsSoFar[nameTheater] = [];
  //   catsSoFar[nameTheater].push({
  //     time: timeStart,
  //     date: date,
  //   });
  //   return catsSoFar;
  // }, []);
  // const array = [];
  // for (let i = 0; i < film.length; i++) {
  //   if (array.indexOf(film[i].nameTheater) === -1) {
  //     array.push(film[i].nameTheater);
  //   }
  // }

  return (
    <>
      <Slide />
      <CartContent />
      <div className="schedule-detail-content">
        <div className="schedule-detail-wrap">
          <div className="searh-block">
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3>CineStar Hai Bà Trưng (TP.HCM)</h3>
              </div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3>CineStar Hai Bà Trưng (TP.HCM)</h3>
              </div>
            </div>
          </div>
          <div className="film-block">
            <div className="film-item t-3d">
              <div className="film-item-pic">
                <img src={movie.picture} alt={movie.nameFilm} />
              </div>
              <div className="film-item-txt">
                <h3>{movie.nameFilm}</h3>
                <div className="schedule-block">
                  <div className="schedule-block-load">
                    {film.map((e) => {
                      return (
                        <div
                          key={e._id}
                          className="cinema-item"
                          cine-id="667c7727-857e-4aac-8aeb-771a8f86cd14"
                          cine-name={e}
                        >
                          <h4>Rạp chiếu phim: {e.nameTheater}</h4>
                          <div className="row">
                            <div className="row-date" data-date="16/07/2023">
                              <span>
                                12/5
                                <br />
                                2023
                              </span>
                            </div>
                            <div className="row-hour">
                              <ul>
                                <Link
                                  to={`/order?idRoom=${e.idRoom}&idFilm=${e.idFilm}&idShowTime=${e._id}`}
                                >
                                  <li
                                    data-id="50c8c44e-e7a6-4b8e-b1fa-f4bb99a71458"
                                    data-room-name="01"
                                  >
                                    {e.timeStart}
                                  </li>
                                </Link>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* {array.map((e, index) => {
                      return (
                        <div
                          key={index}
                          className="cinema-item"
                          cine-id="667c7727-857e-4aac-8aeb-771a8f86cd14"
                          cine-name={e}
                        >
                          <h4>Rạp chiếu phim: {e}</h4>

                          <div className="row">
                            <div className="row-date" data-date="16/07/2023">
                              <span>
                                12/5
                                <br />
                                2023
                              </span>
                            </div>

                            <div className="row-hour">
                              <ul>
                                {cats[e].map((cat, index) => {
                                  return (
                                    <li
                                      key={index}
                                      data-id="50c8c44e-e7a6-4b8e-b1fa-f4bb99a71458"
                                      data-room-name="01"
                                      onClick={(e) => {
                                        console.log(e);
                                      }}
                                    >
                                      {cat.time}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })} */}
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
