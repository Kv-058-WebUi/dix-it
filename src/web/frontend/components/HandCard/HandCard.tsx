import React, { Component } from 'react';
import Submit, { PushCardFn } from '../Submit/Submit';
import classNames from 'classnames';
import {Card} from '../GameBoard/GameBoard';
import {connect} from "react-redux";
import {testAction} from '../../redux/actions/testAction'
import {asyncGetData} from '../../redux/actions/fetchData'
import './handcard.scss';

type HandCardState = {
    showSubmitButton: boolean,
    showCard: boolean
};

type HandProps = {
    card: Card,
    pushCard: PushCardFn,
    isCardPushed: boolean
};

class HandCard extends Component <HandProps, HandCardState> {
    constructor(props: HandProps) {
        super(props);

        this.state = {
            showSubmitButton: false,
            showCard: true
        };
    }

    handleCardClick = (): void  => this.setState({ showSubmitButton: true });

    componentDidMount(): void {
        const {asyncGetData} = this.props;
        asyncGetData();
    }

    handleLeave = (e: any): void  => {
        e.preventDefault();
        if (this.state.showSubmitButton) {
            this.setState({showSubmitButton: false});
        }
    };

    render() {
        console.log('APP', this.props);
        const { pushCard, card, isCardPushed } = this.props;
        const blurClass = classNames({
            'border-blur': this.state.showSubmitButton,
            'blur-disabled': isCardPushed
        });
        return (
            <div>
                { this.state.showCard ?
                    <div onMouseLeave={this.handleLeave} className='handcard-container'>
                        <div className='hand-card'>
                            <img className={blurClass}
                                 onClick={this.handleCardClick}
                                 src={`images/cards/${card.card_path}`}
                            />
                        </div>

                        {isCardPushed ? '' :
                             this.state.showSubmitButton ?
                                <Submit pushCard={pushCard}
                                        card={card}
                                /> : ''
                        }
                    </div>
                : '' }
            </div>
        );
    }
}

function mapStateToProps(state:any) {
    return {
        showCard: state.showCard,
        showSubmitButton: state.showSubmitButton
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    test: (value: any) => dispatch(testAction(value)),
    asyncGetData: () => dispatch(asyncGetData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandCard);
