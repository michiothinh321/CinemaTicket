import React from "react";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={clsx(styles.header)}>
      <h1 className={clsx(styles.header_menu)}>
        <Link to="/" className={clsx(styles.header_home)}>
          CINEMA STU
        </Link>
      </h1>
      <input
        className={clsx(styles.header_menu)}
        placeholder="Bạn cần tìm phim...?"
      />
      <h3 className={clsx(styles.header_menu)}>family.tech@gmail.com</h3>
      <button className={clsx(styles.header_menu, styles.btn_header)}>
        <Link to="/history" className={clsx(styles.header_home)}>
          Lịch sử
        </Link>
      </button>
      <Link to="/admin">
        <button className={clsx(styles.header_menu, styles.btn_header)}>
          Quản lý
        </button>
      </Link>
      <Link to="/login">
        <button className={clsx(styles.header_menu, styles.btn_header)}>
          Đăng nhập
        </button>
      </Link>
    </div>
  );
}

export default Header;
