import React from "react";
import "./PageAdmin.scss"
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <>
      <div className="admin_left">
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
            <Link to="/movie">Phim</Link>
          </li>
          <li>
            <Link to="/area">Rạp</Link>
          </li>
          <li>
            <Link to="/category">Thể Loại</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
