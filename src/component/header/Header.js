import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import userSlice from "../../redux/userSlice";
import { user as userAPI } from "../../API";

function Header() {
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // const handleLogout = async () => {
  //   try {
  //     const result = await userAPI.logout();
  //     dispatch(userSlice.actions.setUser(null));
  //   } catch (error) {}
  // };
  const [keywords, setKeyWords] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 922 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };
  if (size.width > 922 && menuOpen) {
    setMenuOpen(false);
  }

  const handleChangeInput = (e) => {
    let keywords = e.target.value;
    setKeyWords(keywords);
    keywords.length > 0
      ? navigate(`/searchmovie?keywords=${keywords.trim()}`)
      : navigate(`/`);
  };
  return (
    <>
      <header className="header">
        <div className="header__content">
          <Link to="/" className="header__content__logo">
            PQT CINEMA
          </Link>
          <nav
            className={`${"header__content__nav"} 
        ${menuOpen && size.width < 922 ? `${"isMenu"}` : ""} 
        }`}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="search-form">
                <div className="form-search">
                  <form action="" id="search">
                    <input
                      id="qsearch"
                      type="text"
                      className="search-field"
                      placeholder="Tìm kiếm..."
                      onChange={handleChangeInput}
                    />
                  </form>
                </div>
              </div>
              <ul>
                <li>
                  <Link to="/">Phim</Link>
                </li>
                <li>
                  <Link to="/">Lịch chiếu</Link>
                </li>
                <li>
                  <Link to="/khuyenmai">Rạp giá & Khuyễn mãi</Link>
                </li>
                <li>
                  <Link to="/lienhe">Liên hệ</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="header__content__toggle">
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>
    </>
    // <div className="header">
    //   <div>
    //     {" "}
    //     <h1 className="header_menu">
    //       <Link to="/" className="header_home">
    //         CINEMA STU
    //       </Link>
    //     </h1>
    //   </div>
    //   <div className="header_menu_right">
    //     {user && (
    //       <>
    //         <h3 className="header_menu">
    //           <Link to="/infouser" className="header_home">
    //             Xin chào: {user.name}
    //           </Link>
    //         </h3>
    //         <Link to="/history" className="header_home">
    //           <button className="header_menu btn_header">Lịch sử</button>
    //         </Link>
    //       </>
    //     )}
    //     {user && user.role && (
    //       <>
    //         <Link to="/admin">
    //           <button className="header_menu btn_header">Quản lý</button>
    //         </Link>
    //       </>
    //     )}

    //     {user ? (
    //       <>
    //         <button className="header_menu btn_header" onClick={handleLogout}>
    //           Đăng xuất
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <Link to={"/login"}>
    //           <button className="header_menu btn_header">Đăng nhập</button>
    //         </Link>
    //         <Link to={"/"}>
    //           <button className="header_menu btn_header">Trang chủ</button>
    //         </Link>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
}

export default Header;
