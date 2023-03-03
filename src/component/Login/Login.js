import React from "react";
import { clsx } from "clsx";
import styles from "./Login.module.scss";
import Header from "../header/Header";
export default function Login() {
  return (
    <>
      <Header />

      <div className={clsx(styles.loginPage)}>
        <div className={clsx(styles.loginPage_right)}>
          <h2>Đăng nhập</h2>
          <div className={clsx(styles.form_right)}>
            <form>
              <div className={clsx(styles.formControl)}>
                <label for="email">Email(*)</label>
                <input type="text" id="email" name="email" />
              </div>
              <div className={clsx(styles.formControl)}>
                <label for="password">Mật khẩu(*)</label>
                <input type="text" id="password" name="password" />
              </div>
              <button type="submit">Đăng nhập</button>
            </form>
          </div>
        </div>
        <div className={clsx(styles.loginPage_left)}>
          <h2>Đăng Ký</h2>
          <div className={clsx(styles.form_left)}>
            <form>
              <div className={clsx(styles.formControl)}>
                <label for="username">Họ Tên(*)</label>
                <input type="text" id="username" name="username" />
              </div>
              <div className={clsx(styles.formControl)}>
                <label for="email">Email(*)</label>
                <input type="text" id="email" name="email" />
              </div>
              <div className={clsx(styles.formControl)}>
                <label for="password">Mật khẩu(*)</label>
                <input type="text" id="password" name="password" />
              </div>
              <div className={clsx(styles.formControl)}>
                <label for="confirmPassword">Nhập lại mật khẩu(*)</label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </div>
              <div className={clsx(styles.formControl)}>
                <label for="phone">Số điện thoại(*)</label>
                <input type="text" id="phone" name="phone" />
              </div>
              <div className={clsx(styles.formControl)}>
                <label for="birthday">Ngày sinh(*)</label>
                <input type="date" id="birthday" name="birthday" />
              </div>
              <button type="submit">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
