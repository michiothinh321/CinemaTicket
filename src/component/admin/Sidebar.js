import React from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <>
      <div className={clsx(styles.admin_left)}>
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/admin">Thống kê</Link>
          </li>
          <li>
            <Link to="/user">Người Dùng</Link>
          </li>
          <li>
            <Link to="/film">Phim</Link>
          </li>
          <li>
            <Link to="/theater">Rạp</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
