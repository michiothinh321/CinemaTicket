import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Select } from "antd";
import {
  movie as movieAPI,
  category as categoryAPI,
  animation as animationAPI,
} from "../../API/index";
import "./PageAdmin.scss";
import minDate from "./../AddFilm/minDate";
const { TextArea } = Input;
export default function EditFilm() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [movie, setMovie] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const [listGenres, setListGenres] = useState([]);
  const [listAnimation, setListAnimation] = useState([]);

  const handleEditMovie = async () => {
    try {
      const result = await movieAPI.editMovie(movie);

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Sửa phim thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Sửa phim thất bại.",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getMovie();
    })();
  }, []);

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
      await getCategoryList();
    })();
  }, []);

  const getCategoryList = async () => {
    try {
      const result = await categoryAPI.getCategoryList();
      setListGenres(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getListAnimation();
    })();
  }, []);

  const getListAnimation = async () => {
    try {
      const result = await animationAPI.getList();
      setListAnimation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const optionsAnimation = [];
  for (let i = 0; i < listAnimation.length; i++) {
    optionsAnimation.push({
      label: listAnimation[i].nameAnimation,
      value: listAnimation[i].nameAnimation,
    });
  }

  const optionsCategory = [];
  for (let i = 0; i < listGenres.length; i++) {
    optionsCategory.push({
      label: listGenres[i].nameCategory,
      value: listGenres[i].nameCategory,
    });
  }
  console.log(movie);
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Thêm phim</h1>
        <Form
          className="form_addfilm"
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
              value={movie.nameFilm || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, nameFilm: e.target.value }))
              }
            />
          </Form.Item>
          {/* <Form.Item label="Thể loại">
            <Input
              placeholder="Thể loại"
              id="genres"
              name="genres"
              value={movie.genres || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, genres: e.target.value }))
              }
            />
          </Form.Item> */}
          <Form.Item label="Thể loại">
            <Select
              mode="multiple"
              allowClear
              onChange={(e) => setMovie((pre) => ({ ...pre, genres: e }))}
              style={{ width: "100%" }}
              placeholder="Please select"
              options={optionsCategory}
            />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              placeholder="Tác giả"
              id="directors"
              name="directors"
              value={movie.directors || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, directors: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Diễn viên">
            <Input
              placeholder="Diễn viên"
              id="actors"
              name="actors"
              value={movie.actors || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, actors: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Animation">
            <Select
              mode="multiple"
              allowClear
              onChange={(e) =>
                setMovie((pre) => ({
                  ...pre,
                  animation: e,
                }))
              }
              style={{ width: "100%" }}
              placeholder="Please select"
              options={optionsAnimation}
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu">
            <input
              type="date"
              id="date"
              name="date"
              min={minDate()}
              value={movie.date?.slice(0, 10).split("-").join("-") || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, date: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Thời lượng">
            <input
              type="number"
              id="time"
              name="time"
              value={movie.time || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, time: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Nội dung">
            <TextArea
              rows={4}
              id="content"
              name="content"
              value={movie.content || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, content: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input
              placeholder="Trailer"
              id="trailer"
              name="trailer"
              value={movie.trailer || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, trailer: e.target.value }))
              }
            />
          </Form.Item>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) =>
              setMovie((pre) => ({ ...pre, picture: e.target.value }))
            }
          />
          <Form.Item>
            <Button
              className="styles.btn_film"
              type="primary"
              onClick={() => {
                handleEditMovie();
              }}
            >
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
