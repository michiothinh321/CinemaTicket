import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Col, Row, Tabs } from "antd";
import { Link } from "react-router-dom";
import {
  movie as movieAPI,
  theater as theaterAPI,
  area as areaAPI,
} from "../../API";

const Content = () => {
  const [film, setFilm] = useState([]);
  const [listArea, setListArea] = useState([]);
  const [listTheater, setListTheater] = useState([]);
  const [idArea, setIdArea] = useState("");

  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, []);

  const getMovieList = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getAreaList();
    })();
  }, []);
  const getAreaList = async () => {
    try {
      const result = await areaAPI.getAreaList();
      setListArea(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idArea) {
      (async () => {
        await getTheaterById();
      })();
    }
  }, [idArea]);

  const getTheaterById = async () => {
    try {
      const result = await theaterAPI.getTheaterById({
        idArea,
      });
      setListTheater(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="content_body">
        <div className="content">
          <Tabs
            defaultActiveKey="1"
            style={{ color: "yellow", margin: "20px 0" }}
          >
            <Tabs.TabPane tab="Phim đang chiếu" key="Phim đang chiếu">
              <div className="content_img">
                <Row gutter={[16, 24]}>
                  {film.map((film, index) => {
                    if (
                      parseInt(film.date?.slice(0, 4)) ===
                        new Date().getFullYear() &&
                      parseInt(film.date?.slice(5, 7)) ===
                        new Date().getMonth() + 1
                    ) {
                      return (
                        <Col key={index} className="gutter-row" span={4}>
                          <div key={index} className="content_card">
                            <img src={film.picture} alt="" />
                            <p>{film.nameFilm}</p>

                            <button className="btn_header">
                              <Link to={`/ticket?idFilm=${film._id}`}>
                                Mua Vé
                              </Link>
                            </button>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Phim sắp chiếu" key="Phim sắp chiếu">
              <div className="content_img">
                <Row gutter={[16, 24]}>
                  {film.map((film, index) => {
                    if (
                      parseInt(film.date?.slice(0, 4)) >
                        new Date().getFullYear() ||
                      parseInt(film.date?.slice(5, 7)) >
                        new Date().getMonth() + 1
                    ) {
                      return (
                        <Col key={index} className="gutter-row" span={4}>
                          <div key={index} className="content_card">
                            <img src={film.picture} alt="" />
                            <p>{film.nameFilm}</p>

                            <button className="btn_header">
                              <Link to={`/ticket?idFilm=${film._id}`}>
                                Mua Vé
                              </Link>
                            </button>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div>
          <Tabs
            style={{ color: "white", fontSize: "16px" }}
            tabPosition="left"
            onChange={(e) => setIdArea(e)}
          >
            {listArea.map((area) => {
              return (
                <Tabs.TabPane tab={area.nameArea} key={area._id}>
                  <div>
                    <Tabs
                      style={{ color: "white", fontSize: "16px" }}
                      tabPosition="left"
                      key={area._id}
                    >
                      {listTheater.map((theater) => {
                        return (
                          <Tabs.TabPane
                            tab={theater.nameTheater}
                            key={theater._id}
                          ></Tabs.TabPane>
                        );
                      })}
                    </Tabs>
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Content;
