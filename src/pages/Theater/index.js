import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
export default function Theater() {
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    setFilmList([
      {
        id: 1,
        nameTheater: "Cinema Sư Vạn Hạnh",
        regional: "Hồ Chí Minh",
      },
      {
        id: 2,
        nameTheater: "Cinema Quận 7",
        regional: "Hồ Chí Minh",
      },
      {
        id: 3,
        nameTheater: "Cgv Hồ Gươm",
        regional: "Hà Nội",
      },
    ]);
  }, []);
  return (
    <>
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý rạp</h1>

        <table>
          <tr>
            <th>Id</th>
            <th>Khu vực</th>
            <th>Tên rạp</th>
            <th>Hành động</th>
          </tr>
          {filmList.map((film) => {
            return (
              <tr key={film.id}>
                <td>{film.id}</td>
                <td>{film.regional}</td>
                <td>{film.nameTheater}</td>
                <td>
                  <button className={clsx(styles.btn_theater)}>Sửa rạp</button>
                  <button className={clsx(styles.btn_theater)}>Xóa rạp</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
