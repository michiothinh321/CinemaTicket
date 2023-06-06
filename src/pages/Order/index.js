import { useSelector } from "react-redux";
import { room as roomAPI, showtime as showtimeAPI,ticket as ticketAPI,user as userAPI } from "../../API";
import React, { useEffect, useState } from "react";
import {  notification } from "antd";
import "./OrderContent.scss";
import { Link } from "react-router-dom";
const Order = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idRoom = urlParams.get("idRoom");
  const idFilm = urlParams.get("idFilm");
  const [film, setFilm] = useState([]);
  const [movie, setMovie] = useState({});
  const [numberChair,setNumberChair] = useState([])
  const [isActive, setIsActive] = useState(false);
  const [priceFilm,setPriceFilm] = useState(0)
  const [api, contextHolder] = notification.useNotification();
  const [idShowTime,setIdShowTime]= useState("")

  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      await getMovie();
    })();
  }, []);
  const getMovie = async () => {
    try {
      const result = await roomAPI.getId({ idRoom });
      setMovie(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await getShowtime();
    })();
  }, []);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.getShowtime({ idFilm });
      setFilm(result.data[0]);
      setIdShowTime(result.data[0]._id)
      
    } catch (error) {
      console.log(error);
    }
  };
  const arr = new Array();
  for (let i = 0; i < movie.columns; i++) {
    arr[i] =new Array();
    for (let j = 0; j < movie.rows; j++) {
      arr[i].push(`${i}${j}`)
    }
  }
  // const handleBooking=(e)=>{
  //   e.preventDefault()
  //   setNumberChair((pre)=>[...pre,e.target.innerHTML]);
  //   setPrice(pre=>[...pre,pre+film.price])
  // }

  const handleAddTicket=async (e) => {
    

    try {
      const result = await ticketAPI.addTicket({
       price:priceFilm,
        idShowTime,
        chairs:numberChair,
        email:user.email
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Add Ticket successfully.",
        });
      }
    } catch (error) {
       api.open({
        type: "error",
        message: "Ticket is exsist.",
      });
    }
  };
 
  const handleSetChair= (e)=>{

      e.currentTarget.style.backgroundColor = 'salmon';
      e.currentTarget.style.color = 'white';
      setNumberChair((pre)=>[...pre,e.target.innerHTML]);
      setPriceFilm(prev=>+film.price+prev)
      e.currentTarget.status ='true'
     
      
  }
  return (
    <>
      {contextHolder}

      <div className="order">
        <div className="order_left">
          <div className="order_choice">
            <div className="order_screen">
              <p>Màn hình</p>
            </div>
            <ul>
              <div>
                  {arr.map((chairs,index)=>{
                    return(
                      <ul key={index} >
                          {chairs.map((chair,index)=>{
                            return (
                              <li key={index} 
                              onClick={(e)=>handleSetChair(e)}  
                              style={{  backgroundColor: isActive ? 'salmon' : '',
                                        color: isActive ? 'white' : '',
                                    }}>
                              {chair}
                              </li>
                            )
                          })}
                      </ul>
                    )
                  })}
              </div>
            </ul>
            <div className="order_note">
              <span>Ghế đã chọn</span>
              <span>Ghế đã bán</span>
              <span>Có thể chọn</span>
              <span>Không thể chọn</span>
            </div>
          </div>
        </div>
        <div className="order_right">
          <div className="order_right_img">
            <img src="" alt="Fail" />
            <h2>NameFilm</h2>
          </div>
          <div>
            <p>
              Rạp: {`${film.nameTheater}`} | Phòng: {`${film.nameRoom}`}
            </p>
            <p>
              Suất chiếu: {`${film.timeStart}`} | {`${film.date}`}
            </p>
           
            <p>Ghế:  {numberChair.join(", ")} </p>
            <h2>Tổng: {priceFilm.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </h2>
          </div>
          <div className="order_right_button">
            <Link to="/ticket">
              <button className="order_btn_main">QUAY LẠI</button>
            </Link>
            <Link to='/payment'>
              <button className="order_btn_main" onClick={handleAddTicket}>TIẾP TỤC</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
