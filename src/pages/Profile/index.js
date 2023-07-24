import React, { useState, useEffect } from "react";
import "./profile.scss";
import Slide from "./../../component/header/Slide";
import CartContent from "./../../component/cartcontent/CartContent";

import { Button, Modal, QRCode, Space } from "antd";
import {
  ticket as ticketAPI,
  detailTicket as detailTicketAPI,
} from "../../API";
import userSlice from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [ticket, setTicket] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idTicket, setIdTicket] = useState("");
  const [bill, setBill] = useState("");

  const showModal = (e) => {
    setIdTicket(e);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      await getTicket();
    })();
  }, []);
  const getTicket = async () => {
    try {
      const result = await ticketAPI.getTicket({ email: user.email });
      setTicket(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(ticket);
  useEffect(() => {
    if (idTicket) {
      (async () => {
        await getBill();
      })();
    }
  }, [idTicket]);
  const getBill = async () => {
    try {
      const result = await detailTicketAPI.getDetail({ idTicket });
      setBill(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Slide />
      <CartContent />
      <div className="profile">
        <div className="profile__left">
          <h2>Thông tin cá nhân</h2>
          <div
            className="profile__form"
            style={{ borderRadius: "10px 10px 0 0 " }}
          >
            <span>Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="profile__form">
            <span>Họ tên:</span>
            <span>{user.name}</span>
          </div>
          <div className="profile__form">
            <span>Số điện thoại</span>
            <span>{user.phone}</span>
          </div>
          <div className="profile__form">
            <span>Ngày sinh</span>
            <span>
              {user.dateOfBirth?.slice(0, 10).split("-").reverse().join("/")}
            </span>
          </div>
          <div className="profile__form">
            <span>Chức vụ:</span>
            {user.role ? <span>Admin</span> : <span>Thành viên</span>}
          </div>
          {user.role ? (
            <div
              className="profile__form"
              style={{ borderRadius: "0 0 10px 10px " }}
            >
              <span>Chức vụ:</span>
              <Link to="/admin" style={{ marginRight: "20px" }}>
                Tới trang quản trị
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="profile__right">
          <div className="profile__history">
            <span>Lịch sử đặt vé</span>
          </div>
          <div className="history_content">
            <table>
              <thead>
                <tr>
                  <th>Tên Rạp</th>
                  <th>Phim</th>
                  <th>Tên phòng</th>
                  <th>Ngày đặt vé</th>
                  <th>Ngày chiếu</th>
                  <th>Giờ chiếu</th>
                  <th>Ghế</th>
                  <th>Giá vé</th>
                  <th>Hóa đơn</th>
                </tr>
              </thead>
              <tbody>
                {ticket.map((ticket, index) => {
                  if (ticket.checkout) {
                    return (
                      <tr key={index}>
                        <td>{ticket.nameTheater}</td>
                        <td>{ticket.nameFilm}</td>
                        <td>{ticket.nameRoom}</td>
                        <td>
                          {ticket.date
                            ?.slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td>
                          {ticket.newDate
                            ?.slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td>{ticket.timeStart}</td>
                        <td>{ticket.chairs.join(", ")}</td>
                        <td>
                          {parseInt(ticket.price).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                          <Button
                            type="primary"
                            onClick={() => showModal(ticket._id)}
                          >
                            Xem hóa đơn
                          </Button>
                          <Modal
                            title="Hóa đơn"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <div key={bill.idTicket}>
                              <Space>
                                <QRCode type="canvas" value={bill.idTicket} />
                              </Space>
                              <p>Email: {bill.email}</p>
                              <p>Ghế: {bill.chairs?.join(", ")}</p>
                              <p>
                                Ngày chiếu:{" "}
                                {bill.date
                                  ?.slice(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                              </p>
                              <p>
                                Tên phim: {bill.nameFilm} || Xuất chiếu:{" "}
                                {bill.timeStart} || Thời lượng:{" "}
                                {`${bill.time}p`}
                              </p>
                              <p>
                                Tên rạp: {bill.nameTheater} || Tên phòng:{" "}
                                {bill.nameRoom}
                              </p>
                              <p>
                                Tổng:{" "}
                                {parseInt(bill.price).toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}{" "}
                              </p>
                            </div>
                          </Modal>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
