import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import CartContent from "./../component/cartcontent/CartContent";
import Slide from "./../component/header/Slide";
import Main from "./../component/main/Main";

function DefaultLayout({ children }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />

      <div style={{ flex: "1", margin: "150px 0" }}>{children}</div>
      {/* <Main /> */}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
