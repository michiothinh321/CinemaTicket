import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Col, Divider, Row } from 'antd';
import { Link } from "react-router-dom";
import { movie as movieAPI } from "../../API";

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

const Content = () => {
  const [film, setFilm] = useState([]);
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

  return (
    <>
      <div className="content_body">
        <div className="content">
          <p>
            <a href="/">PHIM ĐANG CHIẾU</a>
          </p>
          <p>
            <a href="/">PHIM SẮP CHIẾU</a>
          </p>
        </div>
         <div className="content_img">
          
        <Row gutter={[16, 24]}>
        {film.map((film, index) => {
            return (
              <Col key={index} className="gutter-row" span={6}>
              <div key={index} className="content_card">
                <img src={film.picture} alt="" />
                <p>{film.nameFilm}</p>

                <button className="btn_header">
                  <Link to={`/ticket?idFilm=${film._id}`}>Mua Vé</Link>
                </button>
              </div>
          </Col>      
            );
          })}
    </Row>
        </div> 
      </div>
    </>
  );
};

export default Content;
