import React, { useState, useEffect } from "react";
import { showtime as showtimeAPI, movie as movieAPI } from "../../API";
import { notification, Button } from "antd";
import { Link } from "react-router-dom";
import "./lichchieu.scss";
import Slide from "../../component/header/Slide";
import CartContent from "../../component/cartcontent/CartContent";

export default function LichChieu() {
  // const keyValue = window.location.search;
  // const urlParams = new URLSearchParams(keyValue);
  // const idFilm = urlParams.get("idFilm");
  const [listMovie, setListMovie] = useState([]);
  const [film, setFilm] = useState([]);
  // const [nameFilm, setNameFilm] = useState("");
  // const [api, contextHolder] = notification.useNotification();
  // useEffect(() => {
  //   (async () => {
  //     await getShowtime();
  //   })();
  // }, []);
  // const getShowtime = async () => {
  //   try {
  //     const result = await showtimeAPI.getShowtime({ idFilm });
  //     setFilm(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    (async () => {
      await ListMovie();
    })();
  }, []);
  const ListMovie = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setListMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const keyValue = window.location.search;
  // const urlParams = new URLSearchParams(keyValue);
  // const idFilm = urlParams.get("idFilm");
  // const [movie, setMovie] = useState({});
  // const [film, setFilm] = useState([]);
  // const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   if (idFilm) {
  //     (async () => {
  //       await getMovie();
  //     })();
  //   }
  // }, [idFilm]);

  // const getMovie = async () => {
  //   try {
  //     const result = await movieAPI.getMovie({
  //       idFilm,
  //     });
  //     setMovie(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (listMovie) {
      (async () => {
        await getShowtime();
      })();
    }
  }, [listMovie]);
  const getShowtime = async () => {
    try {
      listMovie.map(async (e) => {
        const result = await showtimeAPI.getShowtime({ idFilm: e._id });
        setFilm(result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const groupedData = film.reduce((groups, item) => {
    const { nameTheater } = item;
    if (!groups[nameTheater]) {
      groups[nameTheater] = [];
    }

    groups[nameTheater].push({ item });

    return groups;
  }, {});
  // Object.entries(groupedData).map(([nameTheater, items]) => {
  //   console.log(items);
  // });
  return (
    <>
      {/* <Slide />
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
            {listMovie.map((movie, index) => {
              return (
                <div className="film-item t-3d" key={index}>
                  <div className="film-item-pic">
                    <img src={movie.picture} alt="" />
                  </div>
                  <div className="film-item-txt">
                    <h3>TÊN PHIM: {movie.nameFilm}</h3>
                    <div className="schedule-block">
                      <div className="schedule-block-load">
                        {
                          <div className="container">
                            {Object.entries(groupedData).map(
                              ([nameTheater, items]) => (
                                <div key={nameTheater}>
                                  <div
                                    className="cinema-item"
                                    cine-id="667c7727-857e-4aac-8aeb-771a8f86cd14"
                                  >
                                    <h4>Rạp chiếu phim: {nameTheater}</h4>
                                  </div>
                                  <div className="row-date"></div>
                                  <div style={{ display: "flex" }}>
                                    {items.map((item, index) => (
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
                                                <li data-id="50c8c44e-e7a6-4b8e-b1fa-f4bb99a71458">
                                                  {`${item.item.date
                                                    .slice(0, 10)
                                                    .split("-")
                                                    .reverse()
                                                    .join("/")} , ${
                                                    item.item.timeStart
                                                  }`}
                                                </li>
                                              </Link>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}
