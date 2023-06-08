import React, { useEffect, useState } from "react";
import styles from "./History.module.scss";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { ticket as ticketAPI } from "../../API";
export default function History() {
  const [ticket, setTicket] = useState([]);
  const user = useSelector((state) => state.user);

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
  return (
    <>
      <div className={clsx(styles.history_content)}>
        <h1>LỊCH SỬ ĐẶT VÉ</h1>
        <table>
          <thead>
            <tr>
              <th>Tên Rạp</th>
              <th>Phim</th>
              <th>Tên phòng</th>
              <th>Ngày chiếu</th>
              <th>Giờ chiếu</th>
              <th>Ghế</th>
              <th>Giá vé</th>
            </tr>
          </thead>
          <tbody>
            {ticket.map((ticket) => {
              return (
                <tr key={ticket.id}>
                  <td>{ticket.nameTheater}</td>
                  <td>{ticket.nameFilm}</td>
                  <td>{ticket.nameRoom}</td>
                  <td>
                    {ticket.date?.slice(0, 10).split("-").reverse().join("-")}
                  </td>
                  <td>{ticket.timeStart}</td>
                  <td>{ticket.chairs.join(", ")}</td>
                  <td>{ticket.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
