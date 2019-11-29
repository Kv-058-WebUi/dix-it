import React from "react";
import './modalWindow.scss'

interface ModalWindowProps {
    modalWindowType: string
    windowWidth: string
    windowHeight: string
}

export default class ModalWindow extends React.Component<ModalWindowProps, {}> {

    render() {
        const {modalWindowType, windowWidth, windowHeight} : any = this.props;
        return (
            <div className='Shadow'>
                <div className='Form' style={{width: windowWidth, height: windowHeight}}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
