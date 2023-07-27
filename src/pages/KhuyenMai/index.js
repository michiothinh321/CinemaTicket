import React, { useState, useEffect } from "react";
import "./khuyenmai.scss";
import Slide from "../../component/header/Slide";
import CartContent from "../../component/cartcontent/CartContent";
const KhuyenMai = () => {
  return (
    <>
      <Slide />
      <CartContent />
      <div className="promotion-list-content">
        <div className="section-title">
          <h2>Các Ưu đãi</h2>
        </div>
        <div className="promotion-list-wrap">
          <div className="promotion-block">
            <div className="promotion-block-pic">
              <img
                src="	https://cinestar.com.vn/pictures/c_monday.jpg"
                alt="pic"
              />
            </div>
            <div className="promotion-block-txt">
              <h3>C'MONDAY - ƯU ĐÃI THỨ 2</h3>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>
                    - Giá vé ưu đãi: 45.000 đ/vé 2D và 55.000 đ/vé 3D.
                  </span>
                </strong>
              </p>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>
                    - Thời gian: Áp dụng cho tất cả các suất chiếu ngày Thứ Hai
                    hàng tuần
                  </span>
                </strong>
              </p>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>- Lưu ý: Không áp dụng cho các ngày lễ/tết.</span>
                </strong>
              </p>
            </div>
          </div>
          <div className="promotion-block">
            <div className="promotion-block-pic">
              <img
                src="https://cinestar.com.vn/pictures/H%C3%ACnh%20n%E1%BB%81n%20CTKM/c'member.jpg"
                alt="pic"
              />
            </div>
            <div className="promotion-block-txt">
              <h3>C'MEMBER - NGÀY HỘI THÀNH VIÊN</h3>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>
                    Thành Viên Cinestar được áp dụng giá vé ưu đãi, hạng thẻ
                    C’FRIEND và C’VIP.
                  </span>
                </strong>
              </p>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>Thời gian: Thứ Tư hàng tuần</span>
                </strong>
              </p>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <p>
                    - Giá vé: 45,000 đ/vé 2D và 55,000 đ/ vé 3D<br></br>- Giảm
                    10% giá trị hóa đơn bắp nước cho chủ thẻ C’FRIEND và 15% cho
                    chủ thẻ C’VIP.<br></br>- Chương trình tích điểm thành viên
                    và các điều kiện thành viên khác được áp dụng. Lưu ý:{" "}
                    <br></br>- Chỉ áp dụng mua trực tiếp tại quầy.
                    <br></br> - Chương trình không giới hạn số vé và số lần giao
                    dịch trong thời gian diễn ra.<br></br> - Không áp dụng cho
                    các ngày lễ/tết.
                  </p>
                </strong>
              </p>
            </div>
          </div>
          <div className="promotion-block">
            <div className="promotion-block-pic">
              <img
                src="	https://cinestar.com.vn/pictures/H%C3%ACnh%20n%E1%BB%81n%20CTKM/hssv.jpg"
                alt="pic"
              />
            </div>
            <div className="promotion-block-txt">
              <h3>TẸT GA 45K SUỐT TUẦN TOÀN HỆ THỐNG</h3>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>
                    ÁP DỤNG MỨC GIÁ 45K / VÉ 2D - CẢ TUẦN - TOÀN HỆ THỐNG
                  </span>
                </strong>
              </p>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <span>
                    - Thời gian: Áp dụng cho tất cả các suất chiếu ngày Thứ Hai
                    hàng tuần
                  </span>
                </strong>
              </p>
              <p>
                <strong style={{ fontSize: "18px", fontWeight: "normal" }}>
                  <p>
                    Áp dụng dành cho giáo viên, giảng viên, học sinh, sinh viên
                    và thanh niên dưới 22 tuổi, trên toàn hệ thống. Ưu đãi giá
                    vé xem phim chỉ 45,000đ/vé 2D.<br></br> LƯU Ý: - Vui lòng
                    mua TRỰC TIẾP TẠI RẠP và xuất trình thẻ HSSV-GV hoặc CMND có
                    dán ảnh và còn hiệu lực khi mua vé.<br></br> - Mỗi thẻ mua
                    được một vé.<br></br> - Không áp dụng cho các ngày Lễ, Tết,
                    hoặc suất chiếu có phụ thu từ nhà phát hành phim.
                  </p>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KhuyenMai;
