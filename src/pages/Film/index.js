import React, { useState, useEffect } from "react";
import "./PageAdmin.scss";
import { Link } from "react-router-dom";
import {
  notification,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
} from "antd";
import {
  movie as movieAPI,
  area as areaAPI,
  theater as theaterAPI,
  room as roomAPI,
} from "../../API";

export default function Film() {
  const [film, setFilm] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [listArea, setListArea] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idArea, setIdArea] = useState("");
  const [idTheater, setIdTheater] = useState("");
  const [theater, setTheater] = useState([]);
  const [room, setRoom] = useState([]);
  const handleGetIdArea = (e) => {
    setIdArea(e.target.value);
  };
  const handleGetIdTheater = (e) => {
    setIdTheater(e.target.value);
  };
  //MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      film.nameFilm && URL.revokeObjectURL(film.nameFilm);
    };
  }, []);

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
          message: "Delete movie successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Delete movie failure.",
      });
      console.log(error);
    }
  };
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
  console.log(listArea[0]);
  //END CALL API KHU VUC - RAP - PHONG -THE LOAI
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản lý phim</h1>
        <Link to="/addfilm">
          <Button type="primary" htmlType="submit">
            Thêm phim
          </Button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên Phim</th>
              <th>Hình Ảnh</th>
              <th>Ngày công chiếu</th>
              <th>Thời lượng</th>
              <th>Thể loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {film.map((film, index) => {
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
                  <td>{film.genres}</td>
                  <td>
                    <Link to={`/editfilm?idFilm=${film._id}`}>
                      <Button type="primary" htmlType="submit">
                        Sửa phim
                      </Button>
                    </Link>
                    <Button
                      type="primary"
                      danger
                      htmlType="submit"
                      onClick={() => {
                        handleDeleteMovie(film.nameFilm);
                      }}
                    >
                      Xóa phim
                    </Button>

                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={showModal}
                    >
                      Thêm Suất Chiếu
                    </Button>
                    <Modal
                      title="Thêm Suất Chiếu"
                      open={isModalOpen}
                      onOk={handleOk}
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
                            onChange={handleGetIdArea}
                            defaultValue={listArea[0]}
                          >
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
                          <select onChange={handleGetIdTheater}>
                            {theater.map((theater) => {
                              return (
                                <option key={theater._id} value={theater._id}>
                                  {theater.nameTheater}
                                </option>
                              );
                            })}
                          </select>
                        </Form.Item>
                        <Form.Item label="Phòng">
                          <select>
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
                          <select>
                            <option>A</option>
                            <option>B</option>
                          </select>
                        </Form.Item>
                        <Form.Item label="Ngày Chiếu">
                          <DatePicker
                            placeholder="Ngày Chiếu"
                            id="address"
                            name="address"
                          />
                        </Form.Item>
                        <Form.Item label="Giờ Chiếu">
                          <TimePicker
                            placeholder="Giờ Chiếu"
                            id="address"
                            name="address"
                          />
                        </Form.Item>
                        <Form.Item label="Giá vé">
                          <Input
                            placeholder="Giá vé"
                            id="address"
                            name="address"
                          />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
