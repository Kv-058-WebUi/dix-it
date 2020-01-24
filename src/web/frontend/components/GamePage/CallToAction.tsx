import React from "react";
import {connect} from "react-redux";
import { CombinedStateInterface } from "../../redux/reducer/combineReducer";
import './calltoaction.scss';

export interface CallToActionProps {
    showCalltoAction: boolean,
    callToActionText: string
}

class CallToAction extends React.Component<CallToActionProps> {
    render() {
        return (
            <div className="call-to-action">
                <div className="call-to-action_text">{
                    this.props.showCalltoAction ? this.props.callToActionText : ''
                }</div>
            </div>
        )
    }
}

function mapStateToProps(state: CombinedStateInterface) {
    return {
        showCalltoAction: state.gamePageStore.showCalltoAction,
        callToActionText: state.gamePageStore.callToActionText
    }
}

export default connect(mapStateToProps)(CallToAction)
