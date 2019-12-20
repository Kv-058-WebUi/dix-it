import React from "react";
import SocialLoginIcon from "../SocialLoginIcon/SocialLoginIcon";
import {SocialLoginType} from "../SocialLoginIcon/SocialLoginType";
import './SocialLoginBar.scss'

export default class SocialLoginBar extends React.Component {
    render() {
        return (
            <div className="SocialLoginBar">
                <div className="SocialLoginBar-Title"> Quick access</div>
                <SocialLoginIcon socialLoginType={SocialLoginType.Google}/>
                <SocialLoginIcon socialLoginType={SocialLoginType.Facebook}/>
                <SocialLoginIcon socialLoginType={SocialLoginType.Twitter}/>
                <SocialLoginIcon socialLoginType={SocialLoginType.Instagram}/>
            </div>
        );
    }

}
