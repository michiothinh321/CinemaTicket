import React, { useState, useEffect } from "react";
import "./Film.scss";
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
import {
  movie as movieAPI,
  area as areaAPI,
  theater as theaterAPI,
  room as roomAPI,
  showtime as showtimeAPI,
} from "../../API";

export default function Film() {
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [film, setFilm] = useState([]);
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

  //MODAL
  const showModal = (id) => {
    setIsModalOpen(true);
    setIdFilm(id);
  };

  const handleOpenModal = () => {
    handleAddShowTime();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

          if (result.status === 200) {
            api.open({
              type: "success",
              message: "Thêm suất chiếu thành công.",
            });
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
      setFilm(result.data);
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
  const minDate = () => {
    var day = parseInt(dateMovie.date?.toString().slice(8, 10));
    var month = parseInt(dateMovie.date?.toString().slice(5, 7));
    var year = parseInt(dateMovie.date?.toString().slice(0, 4));

    if (day < 10) day = "0" + day.toString();
    if (month < 10) month = "0" + month.toString();

    var minDate = year + "-" + month + "-" + day;
    return minDate;
  };

  //MODAL DELETE
  const confirm = (e) => handleDeleteMovie(e);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <Link to="/addfilm">
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
        </Link>
        <table style={{ color: "black", border: "1px solid black" }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Phim</th>
              <th>Hình Ảnh</th>
              <th>Ngày công chiếu</th>
              <th>Thời lượng</th>
              <th>Mô tả</th>
              <th>Thể loại</th>
              <th>Animation</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {film
              .sort((a, b) => (a.nameFilm > b.nameFilm ? 1 : -1))
              .map((film, index) => {
                if (
                  parseInt(film.date?.slice(0, 4)) > new Date().getFullYear() ||
                  parseInt(film.date?.slice(5, 7)) > new Date().getMonth() + 2
                ) {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{film.nameFilm}</td>
                      <td>
                        <img src={film.picture} alt="" />
                      </td>
                      <td>
                        {film.date?.slice(0, 10).split("-").reverse().join("-")}
                      </td>
                      <td>{film.time}</td>
                      <td>{film.content}</td>
                      <td>{film.genres.join(", ")}</td>
                      <td>{film.animation.join(" , ")}</td>
                      <td>
                        <Link to={`/editfilm?idFilm=${film._id}`}>
                          <Button type="primary" htmlType="submit">
                            Sửa phim
                          </Button>
                        </Link>
                        <Popconfirm
                          title="Xóa phim"
                          description="Bạn có muốn xóa phim này?"
                          onConfirm={() => confirm(film.nameFilm)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="primary" danger>
                            Xóa phim
                          </Button>
                        </Popconfirm>
                        <Link to={`/detailsFilm?idFilm=${film._id}`}>
                          <Button type="primary" htmlType="submit">
                            Chi Tiết Phim
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{film.nameFilm}</td>
                      <td>
                        <img src={film.picture} alt="" />
                      </td>
                      <td>
                        {film.date?.slice(0, 10).split("-").reverse().join("-")}
                      </td>
                      <td>{film.time}</td>
                      <td>{film.content}</td>
                      <td>{film.genres.join(", ")}</td>

                      <td>{film.animation.join(" , ")}</td>
                      <td>
                        <Link to={`/editfilm?idFilm=${film._id}`}>
                          <Button type="primary" htmlType="submit">
                            Sửa phim
                          </Button>
                        </Link>
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(film.nameFilm)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="primary" danger>
                            Xóa phim
                          </Button>
                        </Popconfirm>

                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => showModal(film._id)}
                        >
                          Thêm Suất Chiếu
                        </Button>
                        <Modal
                          title="Thêm Suất Chiếu"
                          open={isModalOpen}
                          onOk={handleOpenModal}
                          onCancel={handleCancel}
                        >
                          <Form
                            className="form_addfilm"
                            labelCol={{
                              span: 4,
                            }}
                            wrapperCol={{
                              span: 14,
                            }}
                            layout="horizontal"
                            style={{
                              minWidth: 600,
                            }}
                          >
                            <Form.Item label="Khu Vực">
                              <select
                                onChange={(e) => {
                                  setIdArea(e.target.value);
                                }}
                                value={idArea}
                              >
                                <option>---SELECT---</option>
                                {listArea.map((area) => {
                                  return (
                                    <option key={area._id} value={area._id}>
                                      {area.nameArea}
                                    </option>
                                  );
                                })}
                              </select>
                            </Form.Item>
                            <Form.Item label="Rạp">
                              <select
                                onChange={(e) => setIdTheater(e.target.value)}
                                value={idTheater}
                              >
                                <option>---SELECT---</option>
                                {theater.map((theater) => {
                                  return (
                                    <option
                                      key={theater._id}
                                      value={theater._id}
                                    >
                                      {theater.nameTheater}
                                    </option>
                                  );
                                })}
                              </select>
                            </Form.Item>
                            <Form.Item label="Phòng">
                              <select
                                onChange={(e) => setIdRoom(e.target.value)}
                                value={idRoom}
                              >
                                <option>---SELECT---</option>
                                {room.map((room) => {
                                  return (
                                    <option key={room._id} value={room._id}>
                                      {room.nameRoom}
                                    </option>
                                  );
                                })}
                              </select>
                            </Form.Item>
                            <Form.Item label="Thể loại">
                              <select
                                onChange={(e) => setAnimation(e.target.value)}
                                value={animation}
                              >
                                <option>---SELECT---</option>
                                {movie.map((e) => {
                                  return (
                                    <option key={e} value={e}>
                                      {e}
                                    </option>
                                  );
                                })}
                              </select>
                            </Form.Item>
                            <Form.Item label="Ngày Chiếu">
                              <input
                                type="date"
                                id="date"
                                name="date"
                                min={minDate()}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </Form.Item>
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
                            <Form.Item label="Phụ thu ghế vip">
                              <select
                                onChange={(e) => setPriceVip(e.target.value)}
                                value={priceVip}
                              >
                                <option>---SELECT---</option>
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
                            </Form.Item>
                          </Form>
                        </Modal>
                        <Link to={`/detailsFilm?idFilm=${film._id}`}>
                          <Button type="primary" htmlType="submit">
                            Chi Tiết Phim
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
