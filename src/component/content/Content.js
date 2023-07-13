import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Col, Row, Tabs } from "antd";
import { Link } from "react-router-dom";
import ReactCardSlider from "react-card-slider-component";
import logo1 from "../image/2d.png";
import logo2 from "../image/3d3.png";
import logo3 from "../image/dolby.png";
import logo4 from "../image/christie.png";
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

  const slides = [
    {
      image: "https://picsum.photos/200/300",
      title: "This is a title",
      description: "This is a description",
      // clickEvent: sliderClick
    },
    {
      image: "https://picsum.photos/600/500",
      title: "This is a second title",
      description: "This is a second description",
      // clickEvent: sliderClick
    },
    {
      image: "https://picsum.photos/700/600",
      title: "This is a third title",
      description: "This is a third description",
      // clickEvent: sliderClick
    },
    {
      image: "https://picsum.photos/500/400",
      title: "This is a fourth title",
      description: "This is a fourth description",
      // clickEvent: sliderClick
    },
    {
      image: "https://picsum.photos/200/300",
      title: "This is a fifth title",
      description: "This is a fifth description",
      // clickEvent: sliderClick
    },
    {
      image: "https://picsum.photos/800/700",
      title: "This is a sixth title",
      description: "This is a sixth description",
      // clickEvent: sliderClick
    },
    {
      image: "https://picsum.photos/800/900",
      title: "This is a seventh title",
      description: "This is a seventh description",
      // clickEvent: sliderClick
    },
  ];
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
                <span></span>
                <h3 data-holder="Chọn phim">Chọn phim</h3>
              </div>
              <div className="select-box">
                <ul>
                  <li>A</li>
                  <li>B</li>
                </ul>
              </div>
            </div>
            <div className="select-list" data-cate="cine">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn rạp</h3>
              </div>
              <div className="select-box"></div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn ngày</h3>
              </div>
              <div className="select-box"></div>
            </div>
            <div className="select-list">
              <div className="select-header">
                <span></span>
                <h3 data-holder="Chọn phim">Chọn suất chiếu</h3>
              </div>
              <div className="select-box"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-page">
        <div className="nav-icon-content">
          <div className="nav-icon-wrap">
            <ul>
              <li>
                <img src={logo4} alt=""></img>
              </li>
              <li>
                <img src={logo3} alt=""></img>
              </li>
              <li>
                <img src={logo1} alt=""></img>
              </li>
              <li>
                <img src={logo2} alt=""></img>
              </li>
            </ul>
          </div>
        </div>
        <div className="sub-tab">
          <div style={{ marginTop: "5em" }}>
            <ReactCardSlider slides={slides} />
          </div>
        </div>
        <div className="movie-content"></div>
        <div className="promotion-content"></div>
      </div>
      {/* <div className="content_body">
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
      </div> */}
    </>
  );
};

export default Content;
