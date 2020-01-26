import ModalWindow from "../ModalWindow/ModalWindow";
import React, {useEffect} from "react";
import './wordinput.scss';
import {OnWordInput, Visibility} from '../GameBoard/GameBoard';

interface wordInputInterface {
    onWordInput: OnWordInput,
}

const WordInput = (props: wordInputInterface) => {
    const width = '400px';
    const height = '50px';
    let word = '';
    const sendWordToParent = (e: any) => {
        if(e.key === 'Enter') {
            const input = document.querySelector('.wordInput') as HTMLInputElement;
            if(input.value != '') {
                if (localStorage.getItem('word')!=null){
                 word = localStorage.getItem('word');}
                 word = word + ' ' + input.value;
                 localStorage.setItem('word', word);
                props.onWordInput(input.value);
            }
        }
    };
    return (
            <React.Fragment>
                <ModalWindow windowWidth={width} windowHeight={height} modalWindowType={'wordInput'}>
                    <div className={'wordWrapper'}>
                        <input className={'wordInput'} placeholder={'Type your association word...'} onKeyDown={sendWordToParent}/>
                    </div>
                </ModalWindow>
            </React.Fragment>
    )
};

export default WordInput;
