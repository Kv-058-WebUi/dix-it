import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import {withStyles} from "@material-ui/styles";
import './SocialLoginIcon.scss'
import {SocialLoginType} from './SocialLoginType'

const FACEBOOK_URL = 'https://www.facebook.com/';
const TWITTER_URL = 'https://twitter.com/';
const INSTAGRAM_URL = 'https://www.instagram.com/';

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

        buttonsList.set(SocialLoginType.Facebook, {
            url: FACEBOOK_URL,
            icon: (<FacebookIcon className={classes.root}/>)
        });
        buttonsList.set(SocialLoginType.Twitter, {
            url: TWITTER_URL,
            icon: (<TwitterIcon className={classes.root}/>)
        });
        buttonsList.set(SocialLoginType.Instagram, {
            url: INSTAGRAM_URL,
            icon: (<InstagramIcon className={classes.root}/>)
        });
        return buttonsList;
    }

    getCurrentLoginTypeButton(socialLoginType: SocialLoginType) {

        const url = this.socialButtonsList.get(socialLoginType).url;
        const icon = this.socialButtonsList.get(socialLoginType).icon;
        return <a href={url}>{icon}</a>;
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
