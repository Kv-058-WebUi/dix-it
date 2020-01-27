import React from 'react';
import './UpBar.scss';
import LinearDeterminate from './TimerBar/TimerBar'
import {WordBar, wordParams} from './WordBar/WordBar';
import { CombinedStateInterface } from '../../redux/reducer/combineReducer';
import { connect } from 'react-redux';

class UpBar extends React.Component<any, any>  {

    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="Wordclass">
                <WordBar />
                <LinearDeterminate timerState={this.props.timerState}/>
            </div>
            );
    }
}

const mapStateToProps = (state: CombinedStateInterface) => ({
    timerState: state.gamePageStore.timer,
});
  
export default connect(mapStateToProps)(UpBar)
