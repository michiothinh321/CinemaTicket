import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { theater as theaterAPI } from "../../API/index";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";

export default function EditTheater() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idTheater = urlParams.get("idTheater");
  const [theater, setTheater] = useState({});

  const [api, contextHolder] = notification.useNotification();

  const handleEditTheater = async () => {
    try {
      const result = await theaterAPI.editTheater(theater);

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Sửa rạp thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Sửa rạp thất bại.",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getTheater();
    })();
  }, []);

  const getTheater = async () => {
    try {
      const result = await theaterAPI.getTheater({
        idTheater,
      });
      setTheater(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Sửa Rạp</h1>
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
          <Form.Item label="Tên Rạp">
            <Input
              placeholder="Tên Rạp"
              id="nameTheater"
              name="nameTheater"
              value={theater.nameTheater || ""}
              onChange={(e) =>
                setTheater((pre) => ({ ...pre, nameTheater: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Địa Chỉ">
            <Input
              placeholder="Địa Chỉ"
              id="address"
              name="address"
              value={theater.address || ""}
              onChange={(e) =>
                setTheater((pre) => ({ ...pre, address: e.target.value }))
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="styles.btn_film"
              type="primary"
              onClick={() => {
                handleEditTheater();
              }}
            >
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
