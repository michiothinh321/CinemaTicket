import React, { useState, useEffect } from "react";
import "./PageAdmin.scss";
import { Link } from "react-router-dom";
import { notification, Button, Modal, Form, Input, Popconfirm } from "antd";
import { theater as theaterAPI } from "../../API";

export default function Theater() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [nameTheater, setNameTheater] = useState("");
  const [address, setAddress] = useState("");
  const [theater, setTheater] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idArea = urlParams.get("idArea");

  useEffect(() => {
    (async () => {
      await getTheaterById();
    })();
  }, []);

  const getTheaterById = async () => {
    try {
      const result = await theaterAPI.getTheaterById({
        idArea,
      });
      setTheater(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameTheater = (e) => {
    setNameTheater(e.target.value);
  };
  const handleAdress = (e) => {
    setAddress(e.target.value);
  };

  const handleDeleteTheater = async (nameTheater) => {
    try {
      const result = await theaterAPI.deleteTheater({
        nameTheater,
      });
      if (result.status === 200) {
        await getTheaterById();
        api.open({
          type: "success",
          message: "Xóa rạp thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Xóa rạp thất bại.",
      });
      console.log(error);
    }
  };

  // OPEN MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModelEdit = () => {
    setIsModalEdit(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  const confirm = (e) => handleDeleteTheater(e);

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
          message: "Thêm rạp thành công.",
        });
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
      <div className="admin_right">
        <h1>Quản Lý Rạp</h1>
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
          onOk={handleAddTheater}
          onCancel={handleCancel}
        >
          <Form
            className="form_addfilm"
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
            {theater.map((theater, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{theater.nameTheater}</td>

                  <td>{theater.address}</td>
                  <td>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={showModelEdit}
                    >
                      Sửa Rạp
                    </Button>
                    <Modal
                      title="Sửa Rạp"
                      open={isModalEdit}
                      onOk={handleCancel}
                      onCancel={handleCancel}
                    >
                      <Form
                        className="form_addfilm"
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
                    <Popconfirm
                      title="Xóa rạp"
                      description="Bạn có muốn xóa rạp này?"
                      onConfirm={() => confirm(theater.nameTheater)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" danger>
                        Xóa rạp
                      </Button>
                    </Popconfirm>
                    <Link
                      to={`/room?idArea=${theater.idArea}&idTheater=${theater._id}`}
                    >
                      <Button type="primary" htmlType="submit">
                        Quản Lý Phòng
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
