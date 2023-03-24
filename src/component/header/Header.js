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
      <h1 className={clsx(styles.header_menu)}>
        <Link to="/" className={clsx(styles.header_home)}>
          CINEMA STU
        </Link>
      </h1>
      <input
        className={clsx(styles.header_menu)}
        placeholder="Bạn cần tìm phim...?"
      />
      {user && (
        <>
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
          <h3 className={clsx(styles.header_menu)}>Xin chào: {user.name}</h3>
        </>
      ) : (
        <Link to={"/login"}>
          <button className={clsx(styles.header_menu, styles.btn_header)}>
            Đăng nhập
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
