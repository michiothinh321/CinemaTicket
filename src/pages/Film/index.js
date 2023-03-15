import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
export default function Film() {
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    setFilmList([
      {
        id: 1,
        nameFilm: "Lật Mặt - 48h",
        thumb:
          "http://localhost:3000/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
        releaseDate: "01/03/2023",
        time: 120,
        genre: "Hành Động",
      },
      {
        id: 2,
        nameFilm: "Hello",
        thumb:
          "http://localhost:3000/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
        releaseDate: "01/03/2023",
        time: 120,
        genre: "Phiêu lưu",
      },
      {
        id: 3,
        nameFilm: "Hi",
        thumb:
          "http://localhost:3000/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
        releaseDate: "01/03/2023",
        time: 100,
        genre: "Tình cảm",
      },
    ]);
  }, []);
  return (
    <>
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý phim</h1>
        <Link to="/addfilm">
          <button className={clsx(styles.btn_film)}>Thêm phim</button>
        </Link>
        <table>
          <tr>
            <th>Id</th>
            <th>Tên Phim</th>
            <th>Hình Ảnh</th>
            <th>Ngày công chiếu</th>
            <th>Thời lượng</th>
            <th>Thể loại</th>
            <th>Hành động</th>
          </tr>
          {filmList.map((film) => {
            return (
              <tr key={film.id}>
                <td>{film.id}</td>
                <td>{film.nameFilm}</td>
                <td>
                  <img src={film.thumb} alt="" />
                </td>
                <td>{film.releaseDate}</td>
                <td>{film.time}</td>
                <td>{film.genre}</td>
                <td>
                  <button className={clsx(styles.btn_film)}>Sửa phim</button>
                  <button className={clsx(styles.btn_film)}>Xóa phim</button>
                  <button className={clsx(styles.btn_film)}>
                    Thêm xuất chiếu
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
