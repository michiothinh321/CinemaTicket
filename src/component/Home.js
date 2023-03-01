import React from 'react';
import Content from './content/Content';
import Footer from './footer/Footer';
import Header from './header/Header';
import Slide from './header/Slide';
import Main from './main/Main';

const Home = () => {
    return (
        <div>
            <Header/>
            <Slide/>
            <Content/>
            <Main/>
            <Footer/>
        </div>
    );
};

export default Home;