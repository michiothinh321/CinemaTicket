import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { movie as movieAPI } from "../../API/index";
import styles from "./PageAdmin.module.scss";
import clsx from "clsx";
const { TextArea } = Input;
export default function AddFilm() {
  const [api, contextHolder] = notification.useNotification();

  const [nameFilm, setNameFilm] = useState("");
  const [genres, setGenres] = useState("");
  const [directors, setDirectors] = useState("");
  const [actors, setActors] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [trailer, setTrailer] = useState("");

  const handlePicture = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setPicture(file.preview);
  };
  const handleAddFilm = async (e) => {
    e.preventDefault();

    try {
      const result = await movieAPI.addfilm({
        nameFilm,
        genres,
        directors,
        actors,
        date,
        time,
        content,
        picture,
        trailer,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Add Film successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Film is exsist.",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className={clsx(styles.admin_right)}>
        <h1>Thêm phim</h1>
        <Form
          className={clsx(styles.form_addfilm)}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Tên phim">
            <Input
              placeholder="Tên phim"
              id="nameFilm"
              name="nameFilm"
              value={nameFilm}
              onChange={(e) => setNameFilm(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Thể loại">
            <Input
              placeholder="Thể loại"
              id="genres"
              name="genres"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              placeholder="Tác giả"
              id="directors"
              name="directors"
              value={directors}
              onChange={(e) => setDirectors(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Diễn viên">
            <Input
              placeholder="Diễn viên"
              id="actors"
              name="actors"
              value={actors}
              onChange={(e) => setActors(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu">
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Thời lượng">
            <input
              type="number"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Nội dung">
            <TextArea
              rows={4}
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input
              placeholder="Trailer"
              id="trailer"
              name="trailer"
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
            />
          </Form.Item>
          <input type="file" id="file" name="file" onChange={handlePicture} />
          <Form.Item>
            <Button
              className={clsx(styles.btn_film)}
              type="submit"
              onClick={handleAddFilm}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
