import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.scss";

import moment from "moment";
import { Button, Input, Form, DatePicker } from "antd";
import { Link } from "react-router-dom";

import { user as userAPI } from "../../API";
export default function EditUser() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const email = urlParams.get("email");
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, []);

  const getUser = async () => {
    try {
      const result = await userAPI.getUser({
        email,
      });
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="admin_right">
        <h1>SỬA THÔNG TIN KHÁCH HÀNG</h1>
        <Form
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          style={{
            minWidth: 300,
          }}
        >
          <Form.Item label="Email">
            <Input
              placeholder="Email"
              id="email"
              name="email"
              value={user.email}
            />
          </Form.Item>
          <Form.Item label="SĐT">
            <Input
              placeholder="SĐT"
              id="phone"
              name="phone"
              value={user.phone}
            />
          </Form.Item>
          <Form.Item label="Họ Tên">
            <Input
              placeholder="Họ Tên"
              id="name"
              name="name"
              value={user.name}
            />
          </Form.Item>
          <Form.Item label="Ngày Sinh">
            <input
              type="date"
              placeholder="Ngày Sinh"
              id="dateOfBirth"
              name="dateOfBirth"
              value={user.dateOfBirth
                ?.slice(0, 10)
                .split("/")
                .reverse()
                .join("/")}
            />
          </Form.Item>
          <Form.Item>
            <Button className="styles.btn_film" type="primary">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
