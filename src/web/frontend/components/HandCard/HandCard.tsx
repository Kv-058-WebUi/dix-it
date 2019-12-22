import React, {Component} from 'react';
import Submit from '../Submit/Submit';
import classNames from 'classnames';
import {connect} from "react-redux";
import {testAction} from '../../redux/actions/testAction'
import {asyncGetData} from '../../redux/actions/fetchData'
import './handcard.scss';

type HandCardState = {
    showSubmitButton: boolean,
    showCard: boolean
};

class HandCard extends Component <any, HandCardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showSubmitButton: false,
            showCard: true
        };
    }

    componentDidMount(): void {
        const {asyncGetData} = this.props;
        asyncGetData();

    }

    handleCardClick = () => this.setState({showSubmitButton: true});

    handleLeave = (e: any) => {
        e.preventDefault();
        if (this.state.showSubmitButton) {
            this.setState({showSubmitButton: false});
        }
    };

    hideCard = () => {
        this.setState({showCard: false}, () => this.props.test(5));
    }

    render() {
        const {pushCard, card = {}} = this.props;

        const blurClass = classNames({
            'border-blur': this.state.showSubmitButton
        });

        return (
            <div>
                {this.state.showCard ?
                    <div onMouseLeave={this.handleLeave} className='handcard-container'>
                        <div className='hand-card'>
                            <img className={blurClass}
                                 onClick={this.handleCardClick}
                                 src={`images/${card.imgURL}`}
                            />
                        </div>
                        {this.state.showSubmitButton ?
                            <Submit pushCard={pushCard} card={card}
                                    hideCard={this.hideCard}/> : ''}
                    </div> : ''}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    test: (value: any) => dispatch(testAction(value)),
    asyncGetData: () => dispatch(asyncGetData()),
});

export default connect(null, mapDispatchToProps)(HandCard);
