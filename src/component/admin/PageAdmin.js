import React from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import logo2 from "../image/one-piece.jpg";
import MenuLeft from "./MenuLeft";

export default function PageAdmin() {
  return (
    <>
      <div className={clsx(styles.admin_page)}>
        <MenuLeft />
        <div className={clsx(styles.admin_right)}>
          <h1>Quản lý người dùng</h1>
          <table>
            <tr>
              <th>Id</th>
              <th>Phim</th>
              <th>Tên phòng</th>
              <th>Ngày đặt vé</th>
              <th>Ngày chiếu</th>
              <th>Giờ chiếu</th>
              <th>Ghế</th>
              <th>Giá vé</th>
              <th>Hành động</th>
            </tr>
            <tr>
              <td>1</td>
              <td>LẬT MẶT: 48h</td>
              <td>Phòng 3</td>
              <td>27/02/2023</td>
              <td>27/02/2023</td>
              <td>11:00</td>
              <td>A1 A2 A3</td>
              <td>150.000</td>
              <td>
                <button>Hủy vé</button>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Id</th>
              <th>Phim</th>
              <th>Tên phòng</th>
              <th>Ngày đặt vé</th>
              <th>Ngày chiếu</th>
              <th>Giờ chiếu</th>
              <th>Ghế</th>
              <th>Giá vé</th>
              <th>Hành động</th>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <img src={logo2} alt=""></img>
              </td>
              <td>Phòng 3</td>
              <td>27/02/2023</td>
              <td>27/02/2023</td>
              <td>11:00</td>
              <td>A1 A2 A3</td>
              <td>150.000</td>
              <td>
                <button>Hủy vé</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
