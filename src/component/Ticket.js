import React from 'react';
import Header from './header/Header';
import TicketContent from './ticket/TicketContent';
import Footer from './footer/Footer';

const Ticket = () => {
    return (
        <div>
            <Header/>
            <TicketContent/>
            <Footer/>
        </div>
    );
};

export default Ticket;