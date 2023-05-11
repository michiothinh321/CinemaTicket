import React, { useState, useEffect } from "react";
import { showtime as showtimeAPI } from "../../API";
import { notification, Button } from "antd";
import { Link } from "react-router-dom";

export default function DetailsFilm() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [film, setFilm] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [id, setId] = useState([]);
  const options = [];

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
  // const handleDeleteCategory = async (nameCategory) => {
  //   try {
  //     const result = await categoryAPI.deleteCategory({
  //       nameCategory,
  //     });
  //     if (result.status === 200) {
  //       await getCategoryList();
  //       api.open({
  //         type: "success",
  //         message: "Xóa thể loại thành công.",
  //       });
  //     }
  //   } catch (error) {
  //     api.open({
  //       type: "error",
  //       message: "Xóa thể loại thât bại.",
  //     });
  //     console.log(error);
  //   }
  // };
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản Lý Suất Chiếu</h1>
        <Link to={"/movie"}>
          <Button type="primary" htmlType="submit">
            Phim
          </Button>
        </Link>

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Giờ Bắt Đầu</th>
              <th>Ngày Chiếu</th>
              <th>Tên Rạp</th>
              <th>Phòng</th>
              <th>Giá Vé</th>
              <th>Tên Phim</th>
              <th>Thể Loại</th>
            </tr>
          </thead>
          <tbody>
            {film.map((film, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{film.timeStart}</td>
                  <td>{film.date?.slice(0, 10).split("-").join("-")}</td>
                  <td>{film.idTheater}</td>
                  <td>{film.idRoom}</td>
                  <td>{film.price}</td>
                  <td>{film.idFilm}</td>
                  <td>
                    <Button type="primary" danger htmlType="submit">
                      Xóa Suất
                    </Button>
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
