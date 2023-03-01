import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import MenuLeft from "./MenuLeft";

export default function User() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList([
      {
        id: 1,
        email: "member1@gmail.com",
        nameUser: "Thịnh",
        phone: "0123123123",
        dateOfBirth: "05/05/2001",
        sex: "Nam",
      },
      {
        id: 2,
        email: "member2@gmail.com",
        nameUser: "Nghĩa",
        phone: "0456456456",
        dateOfBirth: "17/01/2001",
        sex: "Nam",
      },
      {
        id: 3,
        email: "member3@gmail.com",
        nameUser: "Thi",
        phone: "0789789789",
        dateOfBirth: "04/04/2001",
        sex: "Nam",
      },
    ]);
  }, []);
  return (
    <>
      <div className={clsx(styles.admin_page)}>
        <MenuLeft />
        <div className={clsx(styles.admin_right)}>
          <h1>Quản lý người dùng</h1>
          <table>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Họ Tên</th>
              <th>SĐT</th>
              <th>Ngày sinh</th>
              <th>Giới Tính</th>
              <th>Hành động</th>
            </tr>
            {userList.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.nameUser}</td>
                  <td>{user.phone}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.sex}</td>
                  <td>
                    <button>Xóa</button>
                    <button>Sửa</button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
