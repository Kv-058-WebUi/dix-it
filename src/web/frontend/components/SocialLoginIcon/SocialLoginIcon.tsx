import React from "react";
import {withStyles} from "@material-ui/styles";
import './SocialLoginIcon.scss'
import {SocialLoginType} from './SocialLoginType'
const iconGoogle = require('../../images/social_icons/icon-google.svg');
const iconFacebook = require('../../images/social_icons/icon-facebook.svg');
const iconTwitter = require('../../images/social_icons/icon-twitter.svg');
const iconInstagram = require('../../images/social_icons/icon-instagram.svg');

const GOOGLE_URL = '/api/auth/google';
const FACEBOOK_URL = '/api/auth/facebook';
const TWITTER_URL = '/api/auth/twitter';
const INSTAGRAM_URL = '/api/auth/instagram';

const styles = () => ({
    root: {
        color: 'white',
        fontSize: 'large'
    },
});

interface SocialLoginIconProps {
    socialLoginType: string,
    classes: any
}

interface SocialLoginIconState {

}

class SocialLoginIcon extends React.Component<SocialLoginIconProps, SocialLoginIconState> {
    socialButtonsList: any;

    constructor(props: SocialLoginIconProps) {
        super(props);
        this.socialButtonsList = this.initSocialButtonsList();
    }

    initSocialButtonsList(): Map<SocialLoginType, {}> {
        const {classes} = this.props;
        const buttonsList = new Map();

        buttonsList.set(SocialLoginType.Google, {
            url: GOOGLE_URL,
            icon: iconGoogle
        });
        buttonsList.set(SocialLoginType.Facebook, {
            url: FACEBOOK_URL,
            icon: iconFacebook
        });
        buttonsList.set(SocialLoginType.Twitter, {
            url: TWITTER_URL,
            icon: iconTwitter
        });
        buttonsList.set(SocialLoginType.Instagram, {
            url: INSTAGRAM_URL,
            icon: iconInstagram
        });
        return buttonsList;
    }

    getCurrentLoginTypeButton(socialLoginType: SocialLoginType) {

        const url = this.socialButtonsList.get(socialLoginType).url;
        const icon = this.socialButtonsList.get(socialLoginType).icon;
        return <a href={url}><img src={icon}></img></a>;
    }

    render() {
        const {socialLoginType}: any = this.props;
        return (
            <div className="SocialLoginIcon-Wrapper">
                <div className="SocialLoginIcon">
                    {this.getCurrentLoginTypeButton(socialLoginType)}
                </div>
            </div>

        )
    }
}

export default withStyles(styles)(SocialLoginIcon);
