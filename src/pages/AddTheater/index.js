import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { theater as theaterAPI } from "../../API/index";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
export default function AddTheater() {
  const [api, contextHolder] = notification.useNotification();

  const [nameTheater, setNameTheater] = useState("");
  const [location, setLocation] = useState("");

  const handleNameTheater = (e) => {
    setNameTheater(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleAddTheater = async (e) => {
    e.preventDefault();
    try {
      const result = await theaterAPI.addTheater({
        nameTheater,
        location,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm rạp thành công.",
        });
        setLocation("");
        setNameTheater("");
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Tên rạp đã tồn tại.",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Thêm phim</h1>
        <Form
          className={clsx(styles.form_addfilm)}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Tên rạp">
            <Input
              placeholder="Tên rạp"
              id="nameTheater"
              name="nameTheater"
              value={nameTheater}
              onChange={handleNameTheater}
            />
          </Form.Item>
          <Form.Item label="Khu vực">
            <Input
              placeholder="Khu vực"
              id="location"
              name="location"
              value={location}
              onChange={handleLocation}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={clsx(styles.btn_film)}
              type="submit"
              onClick={handleAddTheater}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
