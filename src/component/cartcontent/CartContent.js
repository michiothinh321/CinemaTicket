import React, { useEffect, useState } from "react";
import "./CartContent.scss";
import {
  movie as movieAPI,
  area as areaAPI,
  theater as theaterAPI,
  room as roomAPI,
  showtime as showtimeAPI,
} from "../../API";

const CartContent = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [idMovie, setIdMovie] = useState("");
  const [nameTheater, setNameTheater] = useState("");
  const [dateMovie, setDateMovie] = useState("");

  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, []);
  const getMovieList = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setMovies(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idMovie) {
      (async () => {
        await getShowtime();
      })();
    }
  }, [idMovie]);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.getShowtime({ idFilm: idMovie });
      setShowtimes(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetFilm = (e) => {
    setIdMovie(e.target.value);
  };
  const handleSetTheater = (e) => {
    setNameTheater(e.target.value);
  };
  const handleSetDate = (e) => {
    setDateMovie(e.target.value);
  };
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
                <select onChange={handleSetFilm}>
                  <option>Chọn phim</option>
                  {movies.map((movie, index) => {
                    return (
                      <option key={index} value={movie._id}>
                        {movie.nameFilm}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <select onChange={handleSetTheater}>
                  <option defaultValue="Chọn rạp">Chọn rạp</option>
                  {showtimes.map((showtime, index) => {
                    return (
                      <option key={index} value={showtime.nameTheater}>
                        {showtime.nameTheater}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <select onChange={handleSetDate}>
                  <option>Chọn ngày</option>
                  {showtimes.map((showtime, index) => {
                    if (showtime.nameTheater.includes(nameTheater)) {
                      return <option key={index}>{showtime.date}</option>;
                    }
                  })}
                </select>
              </div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <select>
                  <option>Chọn suất chiếu</option>
                  {showtimes.map((showtime, index) => {
                    if (showtime.date.includes(dateMovie)) {
                      return <option key={index}>{showtime.timeStart}</option>;
                    }
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
