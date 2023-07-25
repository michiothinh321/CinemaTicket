import React, { useState, useEffect } from "react";
import "./Showtime.scss";

import { Link } from "react-router-dom";
import {
  notification,
  Button,
  Modal,
  Form,
  Popconfirm,
  Radio,
  RadioChangeEvent,
} from "antd";
import minDate from "./../AddFilm/minDate";
import {
  movie as movieAPI,
  area as areaAPI,
  theater as theaterAPI,
  room as roomAPI,
  showtime as showtimeAPI,
  bangoi as bangoiAPI,
} from "../../API";

export default function Showtime() {
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [listArea, setListArea] = useState([]);
  const [idArea, setIdArea] = useState("");
  const [idTheater, setIdTheater] = useState("");
  const [idRoom, setIdRoom] = useState("");
  const [animation, setAnimation] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [price, setPrice] = useState("");
  const [priceVip, setPriceVip] = useState("");
  const [theater, setTheater] = useState([]);
  const [room, setRoom] = useState([]);
  const [idFilm, setIdFilm] = useState("");
  const [movie, setMovie] = useState([]);
  const [dateMovie, setDateMovie] = useState("");
  const [value, setValue] = useState(1);
  const [showtime, setShowtime] = useState([]);

  const Animation2D = [75000, 95000];
  const Animation3D = [120000, 150000];
  const Vip = [5000, 10000, 15000, 20000];

  //CALL API KHU VUC - RAP - PHONG -THE LOAI
  useEffect(() => {
    (async () => {
      await getAreaList();
    })();
  }, []);
  const getAreaList = async () => {
    try {
      const result = await areaAPI.getAreaList();
      setListArea(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idArea) {
      (async () => {
        await getTheaterById();
      })();
    }
  }, [idArea]);
  const getTheaterById = async () => {
    try {
      const result = await theaterAPI.getTheaterById({
        idArea,
      });
      setTheater(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idTheater) {
      (async () => {
        await getRoomById();
      })();
    }
  }, [idTheater]);

  const getRoomById = async () => {
    try {
      const result = await roomAPI.getRoomById({
        idTheater,
      });
      setRoom(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //END CALL API KHU VUC - RAP - PHONG -THE LOAI

  //THEM SUAT CHIEU
  const handleAddShowTime = async () => {
    try {
      if (timeStart.slice(0, 2) >= 9 && timeStart.slice(0, 2) <= 23) {
        if (price >= 45000) {
          const result = await showtimeAPI.addShowTime({
            price,
            timeStart,
            date,
            idRoom,
            idFilm,
            priceVip,
            animation,
          });
          const result1 = await bangoiAPI.addBaNgoi({
            idRoom,
            idFilm,
            timeStart,
          });
          if (result.status === 200) {
            api.open({
              type: "success",
              message: "Thêm suất chiếu thành công.",
            });
            await getShowtime();
          }
        } else {
          api.open({
            type: "error",
            message: "Giá tiền không hợp lệ.",
          });
        }
      } else {
        api.open({
          type: "error",
          message: "Không thể tạo suất trước 9h và sau 23h.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Thêm suất chiếu thất bại.",
      });
    }
  };

  //CALL API DS PHIM
  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, []);
  const getMovieList = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setMovies(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idFilm) {
      (async () => {
        await getMovie();
      })();
    }
  }, [idFilm]);
  const getMovie = async () => {
    try {
      const result = await movieAPI.getMovie({ idFilm });
      setMovie(result.data.animation);
      setDateMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (idFilm) {
      (async () => {
        await getShowtime();
      })();
    }
  }, [idFilm]);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.getShowtime({ idFilm });
      setShowtime(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //XOA PHIM
  const handleDeleteMovie = async (nameFilm) => {
    try {
      const result = await movieAPI.deleteMovie({
        nameFilm,
      });
      if (result.status === 200) {
        await getMovieList();
        api.open({
          type: "success",
          message: "Xóa phim thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Xóa phim thất bại.",
      });
      console.log(error);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ marginBottom: "0" }}>Thêm lịch chiếu phim</h1>
        <div className="showtime">
          <div className="form">
            <div className="formLeft">
              <select onClick={(e) => setIdFilm(e.target.value)}>
                <option>Chọn Phim</option>
                {movies.map((movie, index) => {
                  return (
                    <option key={index} value={movie._id}>
                      {movie.nameFilm}
                    </option>
                  );
                })}
              </select>
              <select onClick={(e) => setIdArea(e.target.value)}>
                <option>Chọn khu vực</option>
                {listArea.map((area, index) => {
                  return (
                    <option key={index} value={area._id}>
                      {area.nameArea}
                    </option>
                  );
                })}
              </select>
              <select onClick={(e) => setIdTheater(e.target.value)}>
                <option>Chọn rạp</option>
                {theater.map((theater, index) => {
                  return (
                    <option key={index} value={theater._id}>
                      {theater.nameTheater}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={(e) => setIdRoom(e.target.value)}
                value={idRoom}
              >
                <option>Chọn phòng</option>
                {room.map((room, index) => {
                  return (
                    <option key={index} value={room._id}>
                      {room.nameRoom}
                    </option>
                  );
                })}
              </select>

              <Form.Item label="Ngày chiếu">
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={minDate()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="formRight">
              <select
                onChange={(e) => setAnimation(e.target.value)}
                value={animation}
              >
                <option>Chọn thể loại</option>
                {movie.map((movie, index) => {
                  return <option key={index}>{movie}</option>;
                })}
              </select>
              <Form.Item label="Giờ Chiếu">
                <input
                  placeholder="Giờ Chiếu"
                  id="time"
                  name="time"
                  type="time"
                  onChange={(e) => setTimeStart(e.target.value)}
                  value={timeStart}
                />
              </Form.Item>
              <Form.Item label="Giá vé">
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Nhập giá vé</Radio>
                  <Radio value={2}>Chọn giá vé</Radio>
                </Radio.Group>
                <br></br>
                {value === 1 ? (
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    type="number"
                    min={45000}
                    step={5000}
                    placeholder="Nhập giá vé"
                  />
                ) : (
                  <select
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  >
                    <option>---SELECT---</option>
                    {animation === ""
                      ? ""
                      : animation === "2D"
                      ? Animation2D.map((e) => {
                          return (
                            <option key={e} value={e}>
                              {e.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </option>
                          );
                        })
                      : Animation3D.map((e) => {
                          return (
                            <option key={e} value={e}>
                              {e.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </option>
                          );
                        })}
                  </select>
                )}
              </Form.Item>
              <select
                onChange={(e) => setPriceVip(e.target.value)}
                value={priceVip}
              >
                <option>Phụ thu vip</option>
                {Vip.map((e) => {
                  return (
                    <option key={e} value={e}>
                      {e.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="img">
            {dateMovie.picture ? (
              <img src={dateMovie.picture} alt=""></img>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button type="primary" htmlType="submit" onClick={handleAddShowTime}>
          Thêm Suất Chiếu
        </Button>
        <main className="table">
          <section className="table__header"></section>
          <section className="table__body">
            <table style={{ color: "black" }}>
              <thead>
                <tr>
                  <th>STT</th>

                  <th>Rạp</th>
                  <th>Phòng</th>
                  <th>Ngày chiếu</th>
                  <th>Giờ chiếu</th>
                  <th>Thể loại</th>
                  <th>Giá vé</th>
                  <th>Phụ thu ghế vip</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {showtime.map((showtime, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{showtime.nameTheater}</td>
                      <td>{showtime.nameRoom}</td>
                      <td>
                        {showtime.date
                          ?.slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                      <td>{showtime.timeStart}</td>
                      <td>{showtime.animation}</td>
                      <td>
                        {parseInt(showtime.price).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>
                        {" "}
                        {parseInt(showtime.priceVip).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{index}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
