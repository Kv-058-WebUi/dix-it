import React, {Component} from 'react';
import Menu from "./Menu";
import Header from './Header';
import Footer from "./Footer";
import '../styles/components/mainpage.scss';

export default class MainPage extends Component {
    render() {
        return (
            <div className={'container'}>
                <img className='unicorn' src={require('../images/UNICORN.png')} alt='logo'/>
                <Header />
                <Menu />
                <Footer />
            </div>
        );
    }
}