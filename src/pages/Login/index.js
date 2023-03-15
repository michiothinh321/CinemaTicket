import React, { useState } from "react";
import { clsx } from "clsx";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { user as userAPI } from "../../API/index";
import userSlice from "../../redux/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [loginInfo, setLoginInfo] = useState({});

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };
  const register = async (e) => {
    e.preventDefault();

    try {
      const result = await userAPI.register({
        name: fullName,
        email,
        password,
        phone,
        dateOfBirth,
      });
      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Register successfully.",
        });
        setFullName("");
        setEmail("");
        setPassword("");
        setRetypePassword("");
        setPhone("");
        setDateOfBirth("");
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Email exsist.",
      });
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await userAPI.login(loginInfo);
      dispatch(userSlice.actions.setUser(result.data.user));
      document.cookie = `token=${result.data.refreshToken}`;
      navigate("/");
    } catch (error) {
      api.open({
        type: "error",
        message: "Email or password incorrect.",
      });
    }
  };

  const handleLoginInfoChange = (key, value) => {
    setLoginInfo((pre) => {
      return { ...pre, [key]: value };
    });
  };

  return (
    <>
      {contextHolder}
      <div className={clsx(styles.loginPage)}>
        <div className={clsx(styles.loginPage_right)}>
          <h2>Đăng nhập</h2>
          <div className={clsx(styles.form_right)}>
            <form>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="email">Email(*)</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    handleLoginInfoChange("email", e.target.value);
                  }}
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="password">Mật khẩu(*)</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    e.preventDefault();
                    handleLoginInfoChange("password", e.target.value);
                  }}
                />
              </div>
              <button
                className={clsx(styles.btn_log)}
                type="submit"
                onClick={login}
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
        <div className={clsx(styles.loginPage_left)}>
          <h2>Đăng Ký</h2>
          <div className={clsx(styles.form_left)}>
            <form>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="username">Họ Tên(*)</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="email">Email(*)</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="password">Mật khẩu(*)</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="confirmPassword">Nhập lại mật khẩu(*)</label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={retypePassword}
                  onChange={handleRetypePasswordChange}
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="phone">Số điện thoại(*)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label htmlFor="birthday">Ngày sinh(*)</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </div>
              <button className={clsx(styles.btn_log)} onClick={register}>
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
