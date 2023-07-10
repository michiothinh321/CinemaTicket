import React, { useEffect, useState } from "react";
import "./History.scss";
import { Button, Modal, QRCode, Space } from "antd";
import { useSelector } from "react-redux";
import {
  ticket as ticketAPI,
  detailTicket as detailTicketAPI,
} from "../../API";
export default function History() {
  const [ticket, setTicket] = useState([]);
  const user = useSelector((state) => state.user);
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
      <div className="history_content">
        <h1>LỊCH SỬ ĐẶT VÉ</h1>
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
                      {ticket.date?.slice(0, 10).split("-").reverse().join("-")}
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
                            {bill.timeStart} || Thời lượng: {`${bill.time}p`}
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
    </>
  );
}
