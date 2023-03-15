import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { notification } from "antd";

import styles from "./PageAdmin.module.scss";
import { user as userAPI } from "../../API";

export default function User() {
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      await getUserList();
    })();
  }, []);

  const getUserList = async () => {
    try {
      const result = await userAPI.getUserList({ token: user.accessToken });
      setUserList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const result = await userAPI.deleteUser({
        email,
        token: user.accessToken,
      });
      if (result.status === 200) {
        await getUserList();
        api.open({
          type: "success",
          message: "Delete user successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Delete user failure.",
      });
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý người dùng</h1>
        <table>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Họ Tên</th>
            <th>SĐT</th>
            <th>Ngày sinh</th>
            <th>Hành động</th>
          </tr>
          {userList.map((user, index) => {
            return (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  {user.dateOfBirth.slice(0, 10).split("-").reverse().join("-")}
                </td>
                <td>
                  <button
                    className={clsx(styles.btn_user)}
                    onClick={() => {
                      handleDeleteUser(user.email);
                    }}
                  >
                    Xóa
                  </button>
                  <button className={clsx(styles.btn_user)}>Sửa</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
