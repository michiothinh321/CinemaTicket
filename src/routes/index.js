// import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import {
  Home,
  Ticket,
  Order,
  Payment,
  Admin,
  User,
  Film,
  History,
  Theater,
  Login,
} from "../pages";
import { DefaultLayout, AdminLayout } from "../layouts";

const PrivateRoutes = ({ children }) => {
  // const isLogin = useSelector(getUser);
  if (true) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

const publicRoutes = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/ticket",
    layout: DefaultLayout,
    component: Ticket,
  },
  {
    path: "/order",
    layout: DefaultLayout,
    component: Order,
  },
  {
    path: "/payment",
    layout: DefaultLayout,
    component: Payment,
  },
  {
    path: "/history",
    layout: DefaultLayout,
    component: History,
  },
  {
    path: "/admin",
    layout: AdminLayout,
    component: Admin,
  },
  {
    path: "/user",
    layout: AdminLayout,
    component: User,
  },
  {
    path: "/film",
    layout: AdminLayout,
    component: Film,
  },
  {
    path: "/theater",
    layout: AdminLayout,
    component: Theater,
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login,
  },
];

const privateRoutes = (() => {
  return [{}];
})();

export { publicRoutes, privateRoutes, PrivateRoutes };
