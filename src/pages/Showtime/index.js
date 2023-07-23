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
import {
  movie as movieAPI,
  area as areaAPI,
  theater as theaterAPI,
  room as roomAPI,
  showtime as showtimeAPI,
} from "../../API";

export default function Showtime() {
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ marginBottom: "0" }}>Thêm lịch chiếu phim</h1>
        <div className="showtime">
          <div className="form">
            <div className="formLeft">
              <select>
                <option>Chọn Phim</option>
              </select>
              <select>
                <option>Chọn khu vực</option>
              </select>
              <select>
                <option>Chọn rạp</option>
              </select>
              <select>
                <option>Chọn phòng</option>
              </select>
              <select>
                <option>Chọn ngày chiếu</option>
              </select>
            </div>
            <div className="formRight">
              <select>
                <option>Chọn thể loại</option>
              </select>
              <select>
                <option>Chọn giờ</option>
              </select>
              <select>
                <option>Chọn vé</option>
              </select>
              <select>
                <option>Chọn vip</option>
              </select>
            </div>
          </div>
          <div className="img">
            <img
              src="data:image/jpeg;base64,
            /9j/4AAQSkZJRgABAQAAAQABAAD/
            2wCEAAoHCBQVFBgVFRUYGRgZGhgaGhsaGhsaGhobG
            hsaGhgbGxgbIS0kGx0qIRoYJTclKi4xNDQ0GiM6Pzo
            zPi0zNDEBCwsLEA8QHRISHTMjIyozMzMzMzMzMzMzMzMzMz
            MxMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//AA
            BEIAREAuAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQ
            YBB//EAEoQAAIBAgQDBQQHAgsGBwEAAAECEQADBBIhMQVBUQYTImFxMoGRoQcUQ
            rHB0fCz4SM1UmJyc4KSorLCFTRDY4TxJCUzNnSD0hb/xAAaAQADAQEBAQAAAAAAAAAA
            AAABAgMABQQG/8QAJxEAAgICAgEDBAMBAAAAAAAAAAECERIhAzFBBBNRMmFxkSKx8BT/2g
            AMAwEAAhEDEQA/APGaVdilFGjWcpV2KUVqMcpVL3LQDBg6AwYJ6A8679XeSMpkCSIMgdT0FAbF/
            BDSqXumjNBiYmNJ6T1ojCeGWZWylWUEDQk76nTaawMX8Cbht0Akrook6roPSad/sm9/I2/nL+dWN3iaO
            GRFYlgQIUSZUjkZ51Ld4xbkyrAjSMoGoBUyJ8z8KxqdWVA4Ve3ybb+JfzoZ7bAkEGQSDz1G+tX44zbgiH1H8lY
            2I1E60/CYyVMJcILMQVWRDMW5GOdZ6NGLbpKzNZT0NEWcFccZlWRMTIGoAPM+Yq2xGPWMmVy2dTBGujKYidzB09KeOKIC
            6lXljtlE+yikETv4B8axqZR3cM6gFhvMag7b7GoTV22JGZFytIkFcsNLEHrJ2+6g8aGu3WKoxOkiPEIABkDbWtYcZdUAUooh8F
            cAJKMANyQQB8qjNpomDExPKek1rQXCS7RFSqVrRABIIBmDGhjeDzqKsK012KlSpRRAKlXYpVjE8
            Uop8V2KtRKyOKWSj+FcNuYi9bsWwC9xgonQCdyTyAAJPkDXra/
            RNgFy2rmNufWGWVUNaXNEyVtMpYroftct
            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"
              alt=""
            ></img>
          </div>
        </div>

        <main className="table">
          <section className="table__header"></section>
          <section className="table__body">
            <table style={{ color: "black" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Khu vực</th>
                  <th>Rạp</th>
                  <th>Phòng</th>
                  <th>Ngày chiếu</th>
                  <th>Giờ chiếu</th>
                  <th>Thể loại</th>
                  <th>Giá vé</th>
                  <th>Giá vé vip</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                  <td>a</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
