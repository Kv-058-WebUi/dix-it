import React from "react"
import Table from "./Table"
import './lobby.scss'

export default class Lobby extends React.Component {

    render() {
        return (
            <div className={'lobby-wrapper'}>
                <Table/>
            </div>
        )
    }

};
