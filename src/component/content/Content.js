import React, { useEffect, useRef, useState } from "react";
import "./Content.scss";
import { SmoothScrolling } from "./Controller";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo1 from "../image/2d.png";
import logo2 from "../image/3d3.png";
import logo3 from "../image/dolby.png";
import logo4 from "../image/christie.png";

const Content = () => {
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const sliderRef = useRef();
  const movieRef = useRef();

  //SLIDER
  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothScrolling(
        sliderRef.current,
        250,
        movieRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
    }
  };
  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothScrolling(
        sliderRef.current,
        250,
        -movieRef.current.clientWidth * 2,
        sliderRef.current.scrollLeft
      );
    }
  };
  useEffect(() => {
    if (isDrag) {
      if (dragMove < dragDown) {
        handleScrollRight();
      }
      if (dragMove > dragDown) {
        handleScrollLeft();
      }
    }
  }, [dragDown, dragMove, isDrag]);
  const onDragStart = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
  };
  const onDragEnd = (e) => {
    setIsDrag(false);
  };
  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };
  //END SLIDER
  const slides = [
    {
      image: "https://picsum.photos/200/300",
      title: "This is a title 1",
    },
    {
      image: "https://picsum.photos/600/500",
      title: "This is a second title 2",
    },
    {
      image: "https://picsum.photos/700/600",
      title: "This is a third title 3",
    },
    {
      image: "https://picsum.photos/700/600",
      title: "This is a third title 4",
    },
    {
      image: "https://picsum.photos/700/600",
      title: "This is a third title 5",
    },
  ];

  return (
    <>
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
          <div
            className="movie-slider"
            ref={sliderRef}
            draggable="true"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
          >
            {slides.map((slide, index) => {
              return (
                <div key={index} className="movieItem" ref={movieRef}>
                  <img src={`${slide.image}`} alt="" draggable="false"></img>
                  <div className="movieName">{`${slide.title}`}</div>
                  <button>BUY</button>
                </div>
              );
            })}
          </div>
          <div className="btnLeft" onClick={handleScrollLeft}>
            <FiChevronLeft />
          </div>
          <div className="btnRight" onClick={handleScrollRight}>
            <FiChevronRight />
          </div>
        </div>
        <div className="movie-content"></div>
        <div className="promotion-content"></div>
      </div>
    </>
  );
};

export default Content;
