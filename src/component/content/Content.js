import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./Content.module.scss";
import { Link } from "react-router-dom";

const Content = () => {
  const [listFilm, setListFilm] = useState([]);

  useEffect(() => {
    setListFilm([
      {
        id: 1,
        thumb:
          "http://localhost:3001/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
        name: "A",
      },
      {
        id: 2,
        thumb:
          "http://localhost:3001/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
        name: "B",
      },
      {
        id: 3,
        thumb:
          "http://localhost:3001/static/media/jujutsu-kaisen-chu-thuat-hoi-chien.413b79b5811b822dfe5f.png",
        name: "C",
      },
    ]);
  }, []);
  return (
    <>
      <div className={clsx(styles.content_body)}>
        <div className={clsx(styles.content)}>
          <p>
            <a href="/">PHIM ĐANG CHIẾU</a>
          </p>
          <p>
            <a href="/">PHIM SẮP CHIẾU</a>
          </p>
        </div>
        <div className={clsx(styles.content_img)}>
          {listFilm.map((film) => {
            return (
              <div key={film.id} className={clsx(styles.content_card)}>
                <img src={film.thumb} alt="" />
                <p>{film.name}</p>

                <button className={clsx(styles.btn_header)}>
                  <Link to={`/ticket?${film.id}`}>Mua Vé</Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Content;
