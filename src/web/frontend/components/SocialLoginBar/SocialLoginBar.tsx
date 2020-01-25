import React from "react";
import SocialLoginIcon from "../SocialLoginIcon/SocialLoginIcon";
import {SocialLoginType} from "../SocialLoginIcon/SocialLoginType";
import './SocialLoginBar.scss'
import GoogleLoginBar from "./GoogleLoginBar";

export default class SocialLoginBar extends React.Component {
    render() {
        return (
            <div className="SocialLoginBar">
                <GoogleLoginBar />
                {/* <div className="SocialLoginBar-Title"> Quick access</div>
                <SocialLoginIcon socialLoginType={SocialLoginType.Google}/>
                <SocialLoginIcon socialLoginType={SocialLoginType.Facebook}/>
                <SocialLoginIcon socialLoginType={SocialLoginType.Twitter}/>
                <SocialLoginIcon socialLoginType={SocialLoginType.Instagram}/> */}
            </div>
        );
    }

}
