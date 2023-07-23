import React from "react";
import Content from "../component/content/Content";
import Slide from "../component/header/Slide";
import Main from "../component/main/Main";
import CartContent from "../component/cartcontent/CartContent";

const Home = () => {
  return (
    <div>
      <Slide />
      <CartContent />
      <Content />
      {/* <Main /> */}
    </div>
  );
};

export default Home;
