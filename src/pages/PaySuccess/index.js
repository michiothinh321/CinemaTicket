import React from "react";
import { QRCode, Space, Result, Button } from "antd";
import { Link } from "react-router-dom";
import "../Payment/PaymentContent.scss";

const PaySuccess = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idTicket = urlParams.get("idTicket");
  return (
    <>
      <Result
        style={{ background: "white" }}
        iconFontSize="80"
        status="success"
        title="Thanh toán thành công"
        subTitle="Gọi số: 0123456789 nếu bạn gặp vấn đề gì!!!."
        extra={[
          <Link to="/" key="console">
            <Button type="primary">Về trang chủ</Button>
          </Link>,
          <Link to="/history" key="buy">
            <Button type="primary">Xem lịch sử + hóa đơn</Button>,
          </Link>,
        ]}
      />
    </>
  );
};

export default PaySuccess;
