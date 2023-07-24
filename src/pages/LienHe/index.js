import React, { useState, useEffect } from "react";
import "./lienhe.scss";
import Slide from "../../component/header/Slide";
import CartContent from "../../component/cartcontent/CartContent";
const LienHe = () => {
  return (
    <>
      <Slide />
      <CartContent />
      <div className="section-title">
        <h2>GỬI NỘI DUNG LIÊN HỆ</h2>
      </div>
      <div className="contact-form">
        <form>
          <div className="input-text name">
            <input
              name="name"
              value=""
              id="name"
              type="text"
              placeholder="HỌ TÊN (*)"
            />
          </div>
          <div className="input-text tel">
            <input
              name="phone"
              value=""
              id="phone"
              type="text"
              placeholder="ĐIỆN THOẠI (*)"
            />
          </div>
          <div className="input-text email">
            <input
              name="email"
              value=""
              id="email"
              type="text"
              placeholder="EMAIL (*)"
            />
          </div>
          <div className="input-area">
            <textarea
              data-holder="NỘI DUNG (*)"
              id="comments"
              name="comments"
              placeholder="NỘI DUNG (*)"
            ></textarea>
          </div>
          <div className="input-but">
            <input id="btn-contact-submit" type="button" value="Gửi" />
          </div>
        </form>
      </div>
    </>
  );
};

export default LienHe;
