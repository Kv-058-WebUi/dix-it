import React from "react";
import './GoogleLoginBar.scss';
const iconGoogle = require('../../images/social_icons/icon-google.svg');

class GoogleLoginBar extends React.Component {
    render() {
        return (
          <a href='/api/auth/google'>
            <div className="GoogleLoginBar">
              <img src={iconGoogle}></img>
              <span className="label">Sign in with Google</span>
            </div>
          </a>
        )
    }
}

export default GoogleLoginBar;
