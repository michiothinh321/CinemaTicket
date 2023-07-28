import React, { useEffect, useState } from "react";
import "./PageAdmin.scss";
import { CChart } from "@coreui/react-chartjs";
import { Card, Col, Row } from "antd";
import { user as userAPI } from "../../API";
import { useSelector } from "react-redux";

import {
  movie as movieAPI,
  area as areaAPI,
  theater as theaterAPI,
  room as roomAPI,
  showtime as showtimeAPI,
  ticket as ticketAPI,
} from "../../API";

export default function PageAdmin() {
  const user = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [film, setFilm] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [price, setPrice] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const [isTicket, setIsTicket] = useState(false);

  useEffect(() => {
    (async () => {
      await getUserList();
    })();
  }, []);

  const getUserList = async () => {
    try {
      const result = await userAPI.getUserList({ token: user.accessToken });
      setUserList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, []);
  const getMovieList = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getTicketList();
    })();
  }, []);
  const getTicketList = async () => {
    try {
      const result = await ticketAPI.getList();
      setTicket(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleIsUser = () => {
    setIsUser(true);
    setIsMovie(false);
    setIsTicket(false);
  };

  const handleIsMovie = () => {
    setIsUser(false);
    setIsMovie(true);
    setIsTicket(false);
  };
  const handleIsTicket = () => {
    setIsUser(false);
    setIsMovie(false);
    setIsTicket(true);
  };

  console.log({ isUser, isMovie, isTicket });
  return (
    <>
      <div>
        <h1>THỐNG KÊ DỮ LIỆU</h1>
        <Row gutter={16} style={{ margin: "0 10px" }}>
          <Col span={6}>
            <Card
              onClick={handleIsUser}
              style={{ cursor: "pointer" }}
              className="card title1"
              title="Tổng thành viên"
              bordered={false}
            >
              Số lượng: {`${userList.length}`}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="card title2"
              title="Tổng phim"
              bordered={false}
              onClick={handleIsMovie}
              style={{ cursor: "pointer" }}
            >
              Số lượng: {`${film.length}`}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              onClick={handleIsTicket}
              className="card title3"
              title="Tổng vé đã bán"
              bordered={false}
              style={{ cursor: "pointer" }}
            >
              Số lượng: {`${ticket.length}`}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="card title4"
              title="Tổng doanh thu"
              bordered={false}
            >
              Tổng:{" "}
              {/* {price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })} */}
            </Card>
          </Col>
        </Row>
        <div>
          <p>
            {isUser ? "user" : isMovie ? "movie" : isTicket ? "ticket" : ""}
          </p>
        </div>
        {/* <div style={{ display: "flex" }}>
          <Card
            title="TỔNG THÀNH VIÊN"
            bordered={false}
            className="card title1"
          >
            <p>TỔNG:</p>
          </Card>
          <Card title="TỔNG PHIM" bordered={false} className="card title2">
            <p>TỔNG:</p>
          </Card>
          <Card title="TỔNG VÉ ĐÃ BÁN" bordered={false} className="card title3">
            <p>TỔNG:</p>
          </Card>
          <Card title="TỔNG DOANH THU" bordered={false} className="card title4">
            <p>TỔNG:</p>
          </Card>
        </div> */}
      </div>
    </>
  );
}
