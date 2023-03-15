import React, { useEffect, useState } from "react";
import styles from "./History.module.scss";
import clsx from "clsx";

export default function History() {
  const [historyTicket, setHitoryTicket] = useState([]);

  useEffect(() => {
    setHitoryTicket([
      {
        id: 1,
        nameTheater: "CGV",
        nameFilm: "Lật Mặt - 48H",
        nameRoom: "Phòng 1",
        bookingDate: "27/02/2023",
        showDate: "23/02/2023",
        showTimes: "11:00",
        nameChair: ["A1", "A2", "A3", "B1", "B2"],
        priceTicket: 1000000,
      },
      {
        id: 2,
        nameTheater: "CGV",
        nameFilm: "Jujusu Kaisen",
        nameRoom: "Phòng 3",
        bookingDate: "27/02/2023",
        showDate: "23/02/2023",
        showTimes: "12:00",
        nameChair: ["C1", "C2", "C3"],
        priceTicket: 150000,
      },
      {
        id: 3,
        nameTheater: "BHD",
        nameFilm: "Phim Ma",
        nameRoom: "Phòng 2",
        bookingDate: "27/02/2023",
        showDate: "23/02/2023",
        showTimes: "01:00",
        nameChair: ["B1", "B2"],
        priceTicket: 100000,
      },
      {
        id: 4,
        nameTheater: "BHD",
        nameFilm: "Thám tử lừng danh",
        nameRoom: "Phòng 1",
        bookingDate: "27/02/2023",
        showDate: "23/02/2023",
        showTimes: "09:00",
        nameChair: ["B1", "-", "B2"],
        priceTicket: 200000,
      },
      {
        id: 5,
        nameTheater: "BHD",
        nameFilm: "Naruto",
        nameRoom: "Phòng 4",
        bookingDate: "27/02/2023",
        showDate: "23/02/2023",
        showTimes: "06:00",
        nameChair: ["B1", "-", "B2"],
        priceTicket: 150000,
      },
    ]);
  }, []);

  return (
    <>
      <div className={clsx(styles.history_content)}>
        <h1>LỊCH SỬ ĐẶT VÉ</h1>
        <table>
          <tr>
            <th>Tên Rạp</th>
            <th>Phim</th>
            <th>Tên phòng</th>
            <th>Ngày đặt vé</th>
            <th>Ngày chiếu</th>
            <th>Giờ chiếu</th>
            <th>Ghế</th>
            <th>Giá vé</th>
          </tr>
          {historyTicket.map((ticket) => {
            return (
              <tr key={ticket.id}>
                <td>{ticket.nameTheater}</td>
                <td>{ticket.nameFilm}</td>
                <td>{ticket.nameRoom}</td>
                <td>{ticket.bookingDate}</td>
                <td>{ticket.showDate}</td>
                <td>{ticket.showTimes}</td>
                <td>{ticket.nameChair}</td>
                <td>{ticket.priceTicket}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
