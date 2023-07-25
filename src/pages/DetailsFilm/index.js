import React, { useState, useEffect } from "react";
import { showtime as showtimeAPI, movie as movieAPI } from "../../API";
import { notification, Button } from "antd";
import { Link } from "react-router-dom";
import "./detailsfilm.scss";
import Slide from "../../component/header/Slide";
import CartContent from "../../component/cartcontent/CartContent";

export default function DetailsFilm() {
  // const keyValue = window.location.search;
  // const urlParams = new URLSearchParams(keyValue);
  // const idFilm = urlParams.get("idFilm");
  // const [film, setFilm] = useState([]);
  // const [nameFilm, setNameFilm] = useState("");
  // const [api, contextHolder] = notification.useNotification();
  // useEffect(() => {
  //   (async () => {
  //     await getShowtime();
  //   })();
  // }, []);
  // const getShowtime = async () => {
  //   try {
  //     const result = await showtimeAPI.getShowtime({ idFilm });
  //     setFilm(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     await getMovie();
  //   })();
  // }, []);
  // const getMovie = async () => {
  //   try {
  //     const result = await movieAPI.getMovie({ idFilm });
  //     setNameFilm(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteCategory = async (nameCategory) => {
  //   try {
  //     const result = await categoryAPI.deleteCategory({
  //       nameCategory,
  //     });
  //     if (result.status === 200) {
  //       await getCategoryList();
  //       api.open({
  //         type: "success",
  //         message: "Xóa thể loại thành công.",
  //       });
  //     }
  //   } catch (error) {
  //     api.open({
  //       type: "error",
  //       message: "Xóa thể loại thât bại.",
  //     });
  //     console.log(error);
  //   }
  // };
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [movie, setMovie] = useState({});
  const [film, setFilm] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (idFilm) {
      (async () => {
        await getMovie();
      })();
    }
  }, [idFilm]);

  const getMovie = async () => {
    try {
      const result = await movieAPI.getMovie({
        idFilm,
      });
      setMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await getShowtime();
    })();
  }, []);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.getShowtime({ idFilm });
      setFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Slide />
      <CartContent />
      <div className="film-details-content">
        <div className="film-details-wrap">
          <div className="film-item t-2d">
            <div className="film-item-pic">
              <img src={movie.picture} alt="" />
            </div>
            <div className="film-item-txt">
              <h3>{movie.nameFilm}</h3>
              <div className="film-overview">
                <span className="l-title">Khởi chiếu:</span>
                <span className="l-value">
                  Từ {movie.date?.slice(0, 10).split("-").reverse().join("/")}
                </span>
              </div>
              <div className="film-overview">
                <span className="l-title">Thể loại:</span>
                <span className="l-value">{movie.genres}</span>
              </div>
              <div className="film-overview">
                <span className="l-title">Diễn viên:</span>
                <span className="l-value">{movie.actors}</span>
              </div>
              <div className="film-overview">
                <span className="l-title">Đạo diễn:</span>
                <span className="l-value">{movie.directors}</span>
              </div>
              <div className="film-item-type">
                <span className="icon-2d"></span>
                <span className="icon-3d"></span>
              </div>
              <p>{movie.content}</p>
              <div className="film-item-but">
                <Link to={`/ticket?idFilm=${movie._id}`}>Mua vé</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
