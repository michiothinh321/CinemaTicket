import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { notification, Button } from "antd";
import { movie as movieAPI } from "../../API";

export default function Theater() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const params = urlParams.get("idArea");
  console.log(params);
  return (
    <>
      <div className={clsx(styles.admin_right)}>
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
            {/* {film.map((film, index) => {
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
                    <Link to="/editfilm">
                      <Button type="primary" htmlType="submit">
                        Sửa phim
                      </Button>
                    </Link>
                    <Button type="primary" danger htmlType="submit">
                      Xóa phim
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Thêm xuất chiếu
                    </Button>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
