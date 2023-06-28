import { useSelector } from "react-redux";
import { room as roomAPI, showtime as showtimeAPI,ticket as ticketAPI,chair as chairAPI} from "../../API";
import React, { useEffect, useState } from "react";
import {  notification } from "antd";
import "./OrderContent.scss";
import { Link } from "react-router-dom";
const Order = () => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ,'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idRoom = urlParams.get("idRoom");
  const idFilm = urlParams.get("idFilm");
  const [film, setFilm] = useState([]);
  const [movie, setMovie] = useState({});
  const [enable, setEnable] = useState([]);
  const [numberChair,setNumberChair] = useState([])
  const [priceFilm,setPriceFilm] = useState(0)
  const [api, contextHolder] = notification.useNotification();
  const [idShowTime,setIdShowTime]= useState("");
  const [chair,setChair] = useState([])
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
  const handleAddTicket=async (e) => {
    try {
      const result = await ticketAPI.addTicket({
       price:priceFilm,
        idShowTime,
        chairs:numberChair,
        email:user.email
      });

     
      const result1 =await chairAPI.addChair({
        idRoom,
        numberChair,
      })

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
 
  useEffect(() => {
    (async () => {
      await getChair();
    })();
  }, []);
  const getChair = async () => {
    try {
      const result = await chairAPI.getChair({ idRoom });
      setChair(result.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const arr = new Array();
  for (let i = 0; i < movie.columns; i++) {
    arr[i] =new Array();
    for (let j = 0; j < movie.rows; j++) {
      arr[i].push({
        'numberChair': `${alphabet[i]}${j}`,
        'status': false,
      })
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for(let ij = 0; ij <chair.length; ij++){
        for(let index=0;index <chair[ij].numberChair.length;index++){
          if(arr[i][j].numberChair===chair[ij].numberChair[index] ){
            arr[i][j].status =true;
          }
        }
      }
    }
  }
  const handleSetChair= (e)=>{
    if(!enable.includes(e.target.innerHTML)){
      setEnable((pre)=>[...pre,e.target.innerHTML])
      e.currentTarget.style.backgroundColor = 'salmon';
      e.currentTarget.style.color = 'white';
      setNumberChair((pre)=>[...pre,e.target.innerHTML]);
      setPriceFilm(prev=>+film.price+prev);
      
    }
    else{
      setEnable(enable.filter(item=>!e.target.innerHTML.includes(item)));
      e.currentTarget.style.backgroundColor = '#1A4FB1';
      e.currentTarget.style.color = 'black';
      setNumberChair(enable.filter(item=>!e.target.innerHTML.includes(item)))
      setPriceFilm(prev=>prev-parseInt(film.price));
    }
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
                              <li key={index} className={chair.status?'disabled':''}
                              onClick={(e)=>handleSetChair(e)}>
                              {chair.numberChair}
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
            <img src={film.picture} alt="Fail" />
            <h2>{film.nameFilm}</h2>
          </div>
          <div>
            <p>
              Rạp: {`${film.nameTheater}`} | Phòng: {`${film.nameRoom}`}
            </p>
            <p>
              Suất chiếu: {`${film.timeStart}`} | {`${film.date?.slice(0, 10).split("-").reverse().join("-")}`}
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
