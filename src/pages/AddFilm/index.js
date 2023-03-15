import React, { useState } from "react";
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

  const handleNameFilm = (e) => {
    setNameFilm(e.target.value);
  };
  const handleGenres = (e) => {
    setGenres(e.target.value);
  };
  const handleDirectors = (e) => {
    setDirectors(e.target.value);
  };
  const handleActors = (e) => {
    setActors(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handlePicture = (e) => {
    setPicture(e.target.value);
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
      });

      if (result.status === 200) {
        console.log(result);
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
              onChange={handleNameFilm}
            />
          </Form.Item>
          <Form.Item label="Thể loại">
            <Input
              placeholder="Thể loại"
              id="genres"
              name="genres"
              value={genres}
              onChange={handleGenres}
            />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              placeholder="Tác giả"
              id="directors"
              name="directors"
              value={directors}
              onChange={handleDirectors}
            />
          </Form.Item>
          <Form.Item label="Diễn viên">
            <Input
              placeholder="Diễn viên"
              id="actors"
              name="actors"
              value={actors}
              onChange={handleActors}
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu">
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleDate}
            />
          </Form.Item>
          <Form.Item label="Thời lượng">
            <input
              type="number"
              id="time"
              name="time"
              value={time}
              onChange={handleTime}
            />
          </Form.Item>
          <Form.Item label="Nội dung">
            <TextArea
              rows={4}
              id="content"
              name="content"
              value={content}
              onChange={handleContent}
            />
          </Form.Item>
          <input
            type="file"
            id="picture"
            name="picture"
            value={picture}
            onChange={handlePicture}
          />
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
