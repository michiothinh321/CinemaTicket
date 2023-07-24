import React from "react";
import "./Slide.scss";
import km1 from "../image/km1.jpg";
import km2 from "../image/km2.jpg";
import km3 from "../image/km3.jpg";
import km4 from "../image/km4.jpg";
import { Carousel } from "antd";
import { user as userAPI } from "../../API";
import userSlice from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Slide = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await userAPI.logout();
      dispatch(userSlice.actions.setUser(null));
    } catch (error) {}
  };

  return (
    <>
      <div className="register-content">
        <div className="register-wrap">
          {user ? (
            <ul>
              <li className="btn-info">
                <a href={`/profile?idUser=${user._id}`}>{user.name}</a>
              </li>
              <li className="btn-logout">
                <button className="btn-logout" onClick={handleLogout}>
                  Đăng Xuất
                </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="btn-register">
                <a href="/login">Đăng ký thành viên</a>
              </li>
              <li className="btn-login">
                <a href="/login">Đăng nhập</a>
              </li>
            </ul>
          )}
          <a href="/" className="hotline">
            028 7300 8881
          </a>
        </div>
      </div>

      <Carousel autoplay>
        <div>
          <img className="slide_img" src={km1} alt="" />
        </div>
        <div>
          <img className="slide_img" src={km2} alt="" />
        </div>
        <div>
          <img className="slide_img" src={km3} alt="" />
        </div>
        <div>
          <img className="slide_img" src={km4} alt="" />
        </div>
      </Carousel>
    </>
  );
};

export default Slide;
