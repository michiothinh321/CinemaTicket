import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./PageAdmin.module.scss";
import { movie as movieAPI } from "../../API";
export default function EditFilm() {
  const [film, setFilm] = useState([]);

  return (
    <>
      <div className={clsx(styles.admin_right)}>
        <h1>SỬA PHIM</h1>
      </div>
    </>
  );
}
