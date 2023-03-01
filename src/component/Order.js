import React from 'react';
import Header from './header/Header';
import OrderContent from './order/OrderContent';
import Footer from './footer/Footer';

const Order = () => {
    return (
        <div>
            <Header/>
            <OrderContent/>
            <Footer/>
        </div>
    );
};

export default Order;