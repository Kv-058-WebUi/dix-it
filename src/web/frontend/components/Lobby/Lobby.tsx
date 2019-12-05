import React from "react"
import Table from "./Table"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './lobby.scss'

export default class Lobby extends React.Component {

    render() {
        return (
            <div className='main-page-container'>
                <Header />
                <div className={'lobby-wrapper'}>
                    <Table/>
                </div>
                <Footer />
            </div>
        )
    }
};
