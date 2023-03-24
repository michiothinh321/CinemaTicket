import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { movie as movieAPI } from "../../API";
export default function Film() {
  const [film, setFilm] = useState([]);
  const [api, contextHolder] = notification.useNotification();

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
  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý phim</h1>
        <Link to="/addfilm">
          <button className={clsx(styles.btn_film)}>Thêm phim</button>
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
                    {film.date.slice(0, 10).split("-").reverse().join("-")}
                  </td>
                  <td>{film.time}</td>
                  <td>{film.genres}</td>
                  <td>
                    <Link to="/editfilm">
                      <button className={clsx(styles.btn_film)}>
                        Sửa phim
                      </button>
                    </Link>
                    <button
                      className={clsx(styles.btn_film)}
                      onClick={() => {
                        handleDeleteMovie(film.nameFilm);
                      }}
                    >
                      Xóa phim
                    </button>
                    <button className={clsx(styles.btn_film)}>
                      Thêm xuất chiếu
                    </button>
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
