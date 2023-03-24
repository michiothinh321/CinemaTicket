import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { notification } from "antd";
import { theater as theaterAPI } from "../../API";
import { Link } from "react-router-dom";
export default function Theater() {
  const [theater, setTheater] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    (async () => {
      await getTheaterList();
    })();
  }, []);
  const getTheaterList = async () => {
    try {
      const result = await theaterAPI.getTheaterList();
      setTheater(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTheater = async (nameTheater) => {
    try {
      const result = await theaterAPI.deleteTheater({
        nameTheater,
      });
      if (result.status === 200) {
        await getTheaterList();
        api.open({
          type: "success",
          message: "Delete theater successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Delete theater failure.",
      });
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý rạp</h1>
        <Link to="/addtheater">
          <button className={clsx(styles.btn_film)}>Thêm Rạp</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Khu vực</th>
              <th>Tên rạp</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {theater.map((theater, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{theater.location}</td>
                  <td>{theater.nameTheater}</td>
                  <td>
                    <button className={clsx(styles.btn_film)}>Sửa rạp</button>
                    <button
                      className={clsx(styles.btn_film)}
                      onClick={handleDeleteTheater}
                    >
                      Xóa rạp
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
