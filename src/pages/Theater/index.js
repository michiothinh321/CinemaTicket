import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { notification, Button, Modal, Form, Input } from "antd";
import { theater as theaterAPI } from "../../API";

export default function Theater() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameTheater, setNameTheater] = useState("");
  const [address, setAddress] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idArea = urlParams.get("idArea");

  const handleNameTheater = (e) => {
    setNameTheater(e.target.value);
  };
  const handleAdress = (e) => {
    setAddress(e.target.value);
  };

  // OPEN MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddTheater();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddTheater = async () => {
    try {
      const result = await theaterAPI.addTheater({
        idArea,
        nameTheater,
        address,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm khu vực thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Tên khu vực đã tồn tại.",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Quản lý phim</h1>
        <Link to="/area">
          <Button type="primary" danger htmlType="submit">
            Khu Vực
          </Button>
        </Link>
        <Button type="primary" htmlType="submit" onClick={showModal}>
          Thêm Rạp
        </Button>
        <Modal
          title="Thêm Rạp"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
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
              minWidth: 600,
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
            <Form.Item label="Địa chỉ">
              <Input
                placeholder="Địa chỉ"
                id="address"
                name="address"
                value={address}
                onChange={handleAdress}
              />
            </Form.Item>
          </Form>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên Rạp</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* {film.map((film, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{film.nameFilm}</td>
                  <td>
                    <img src={film.picture} alt="" />
                  </td>
                  <td>
                    {film.date?.slice(0, 10).split("-").reverse().join("-")}
                  </td>
                  <td>{film.time}</td>
                  <td>{film.genres}</td>
                  <td>
                    <Link to="/editfilm">
                      <Button type="primary" htmlType="submit">
                        Sửa phim
                      </Button>
                    </Link>
                    <Button type="primary" danger htmlType="submit">
                      Xóa phim
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Thêm xuất chiếu
                    </Button>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
