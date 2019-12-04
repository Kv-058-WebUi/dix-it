import React from "react";
import './ModalWindow.scss'

interface ModalWindowProps {
    modalWindowType: string
    windowWidth: string
    windowHeight: string
    isContentCentered?: boolean
}

export default class ModalWindow extends React.Component<ModalWindowProps, {}> {
    static defaultProps = {
        isContentCentered: false
    };

    render() {
        const {modalWindowType, windowWidth, windowHeight, isContentCentered}: any = this.props;
        const contentAlign = isContentCentered ? 'center' : 'left';
        return (
            <div className='Shadow'>
                <div className='ModalWindow'
                     style={{width: windowWidth, height: windowHeight, textAlign: contentAlign}}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
