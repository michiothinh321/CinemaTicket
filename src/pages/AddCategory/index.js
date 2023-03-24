import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { category as categoryAPI } from "../../API/index";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
export default function AddCategory() {
  const [api, contextHolder] = notification.useNotification();

  const [category, setCategory] = useState("");

  const handleNameCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = async (e) => {
    console.log("Hello");
    e.preventDefault();
    try {
      const result = await categoryAPI.addCategory({
        category,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm thể loại thành công.",
        });
        setCategory("");
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
          <Form.Item label="Tên thể loại">
            <Input
              placeholder="Tên thể loại"
              id="category"
              name="category"
              value={category}
              onChange={handleNameCategory}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={clsx(styles.btn_film)}
              type="submit"
              onClick={handleAddCategory}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
