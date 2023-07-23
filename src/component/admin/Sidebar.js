import React from "react";
import { useNavigate } from "react-router-dom";

import "./PageAdmin.scss";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(
    "**---- TRANG CHỦ ----**",
    "home",
    null,
    [getItem("Về trang chủ", "home"), getItem("Thống kê", "admin")],
    "group"
  ),
  getItem(
    "**---- QUẢN LÝ ----**",
    "user",
    null,
    [
      getItem("Người dùng", "user"),
      getItem("Phim", "movie"),
      getItem("Thêm suất chiếu", "showtime"),
      getItem("Rạp chiếu", "theater"),
      getItem("Thể loại", "category"),
    ],
    "group"
  ),
];
export default function Sidebar() {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.key === "home") {
      navigate("/");
    } else if (e.key === "admin") {
      navigate("/admin");
    } else if (e.key === "user") {
      navigate("/user");
    } else if (e.key === "movie") {
      navigate("/movie");
    } else if (e.key === "theater") {
      navigate("/area");
    } else if (e.key === "category") {
      navigate("/category");
    } else if (e.key === "showtime") {
      navigate("/addshowtime");
    }
  };

  return (
    <>
      <Menu
        onClick={onClick}
        theme="dark"
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />

      {/* <div className="admin_left">
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
      </div> */}
    </>
  );
}
