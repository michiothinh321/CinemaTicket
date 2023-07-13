import React from "react";
import "./CartContent.scss";

const CartContent = () => {
  return (
    <>
      <div className="card_content">
        <div className="card-wrap">
          <div className="block-title">
            <h2>
              Mua vé <br></br>Online
            </h2>
          </div>
          <div className="block-list">
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn phim</h3>
              </div>
              <div className="select-box">
                <ul>
                  <li>A</li>
                  <li>B</li>
                </ul>
              </div>
            </div>
            <div className="select-list" data-cate="cine">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn rạp</h3>
              </div>
              <div className="select-box"></div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn ngày</h3>
              </div>
              <div className="select-box"></div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn suất chiếu</h3>
              </div>
              <div className="select-box"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
