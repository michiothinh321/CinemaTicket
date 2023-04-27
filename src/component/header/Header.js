import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import userSlice from "../../redux/userSlice";
import { user as userAPI } from "../../API";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = async () => {
    try {
      const result = await userAPI.logout();
      dispatch(userSlice.actions.setUser(null));
    } catch (error) {}
  };

  return (
    <div className={clsx(styles.header)}>
      <div>
        {" "}
        <h1 className={clsx(styles.header_menu)}>
          <Link to="/" className={clsx(styles.header_home)}>
            CINEMA STU
          </Link>
        </h1>
      </div>
      <div className={clsx(styles.header_menu_right)}>
        {user && (
          <>
            <h3 className={clsx(styles.header_menu)}>
              <Link to="/infouser" className={clsx(styles.header_home)}>
                Xin chào: {user.name}
              </Link>
            </h3>
            <Link to="/history" className={clsx(styles.header_home)}>
              <button className={clsx(styles.header_menu, styles.btn_header)}>
                Lịch sử
              </button>
            </Link>
            <Link to="/admin">
              <button className={clsx(styles.header_menu, styles.btn_header)}>
                Quản lý
              </button>
            </Link>
          </>
        )}

        {user ? (
          <>
            <button
              className={clsx(styles.header_menu, styles.btn_header)}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button className={clsx(styles.header_menu, styles.btn_header)}>
                Đăng nhập
              </button>
            </Link>
            <Link to={"/"}>
              <button className={clsx(styles.header_menu, styles.btn_header)}>
                Trang chủ
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
