import React, { useEffect, useState } from "react";
import "./PageAdmin.scss";
import { CChart } from "@coreui/react-chartjs";
import { Card, Col, Row } from "antd";
import { user as userAPI } from "../../API";
import { useSelector } from "react-redux";

export default function PageAdmin() {
  const user = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);

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
  const price = 200000;
  return (
    <>
      <div>
        <h1>THỐNG KÊ DỮ LIỆU</h1>
        <Row gutter={16} style={{ margin: "0 10px" }}>
          <Col span={6}>
            <Card
              className="card title1"
              title="Tổng thành viên"
              bordered={false}
            >
              Số lượng: 2
            </Card>
          </Col>
          <Col span={6}>
            <Card className="card title2" title="Tổng phim" bordered={false}>
              Số lượng: 2
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="card title3"
              title="Tổng vé đã bán"
              bordered={false}
            >
              Số lượng: 2
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="card title4"
              title="Tổng doanh thu"
              bordered={false}
            >
              Tổng:{" "}
              {price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Card>
          </Col>
        </Row>
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
