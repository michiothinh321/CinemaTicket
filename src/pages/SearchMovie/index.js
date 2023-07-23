import React, { useEffect, useState } from "react";

import "./Search.scss";
import logo from "../../component/image/jujutsu-kaisen-chu-thuat-hoi-chien.png";
import { useViewPort } from "../../component/Hook";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { movie as movieAPI } from "../../API";

function SearchMovie(props) {
  const movieList = [logo, logo, logo, logo, logo];
  const [windowWidth] = useViewPort();
  const [searchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const keywords = searchParams.get("keywords");
  const navigate = useNavigate();
  useEffect(() => {
    if (keywords) {
      (async () => {
        await getMovieList();
      })();
    }
  }, [keywords]);

  const getMovieList = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setSearchMovies(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailFilm = (e) => {
    navigate(`/detailsFilm?idFilm=${e._id}`);
  };
  return (
    <div className="searchPane">
      {searchMovies && searchMovies.length > 0 ? (
        <>
          <div
            className="searchContent"
            style={{
              gridTemplateColumns: `repeat(${
                windowWidth > 1200
                  ? 5
                  : windowWidth > 922
                  ? 4
                  : windowWidth > 768
                  ? 3
                  : windowWidth > 600
                  ? 2
                  : 1
              },auto)`,
            }}
          >
            {searchMovies.map((item, index) => {
              if (item.nameFilm.toLowerCase().includes(keywords)) {
                return (
                  <div
                    className="movieItem"
                    key={index}
                    onClick={() => handleDetailFilm(item)}
                  >
                    <img src={item.picture} alt="" />
                    <span>{item.nameFilm}</span>
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        <div className="notFound">
          <h1 style={{ color: "white" }}>Không tìm thấy Phim</h1>
        </div>
      )}
    </div>
  );
}

export default SearchMovie;
