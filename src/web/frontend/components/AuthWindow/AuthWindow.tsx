import React, { Component } from 'react';
import './AuthWindow.scss';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import SocialLoginBar from '../SocialLoginBar/SocialLoginBar';

enum ActiveTab {
  SignIn = 1,
  SignUp = 2
}

type AuthProps = {
  activeTab?: ActiveTab
};

type AuthState = {
  activeTab: ActiveTab,
  isPending: boolean
};

export { ActiveTab };

export default class AuthWindow extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);

    this.state = {
      activeTab: props.activeTab || ActiveTab.SignUp,
      isPending: false
    };
  }

  switchTab(activeTab: ActiveTab) {
    this.setState({ activeTab });
  }

  setPending(isPending: boolean) {
    this.setState({ isPending });
  }

  render() {
    const formHeight = '590px';
    const formWidth = '390px';
    return (
      <ModalWindow
        modalWindowType='register'
        windowHeight={formHeight}
        windowWidth={formWidth}
        isContentCentered={true}>
        <div className={'AuthWindow' + (this.state.isPending ? ' pending' : '')}>
          <div className='tabs'>
            <a href="#" className={this.state.activeTab == ActiveTab.SignUp ? 'tab active' : 'tab'} onClick={(e) => this.switchTab(ActiveTab.SignUp)}>Sign Up</a>
            <a href="#" className={this.state.activeTab == ActiveTab.SignIn ? 'tab active' : 'tab'} onClick={(e) => this.switchTab(ActiveTab.SignIn)}>Sign In</a>
          </div>
          <div className="auth_form">
            {this.state.activeTab === ActiveTab.SignIn ? (<AuthorizationForm />) : (<RegistrationForm onPending={this.setPending.bind(this)}/>)}
          </div>
          <SocialLoginBar/>
        </div>
      </ModalWindow>
    );
  }
}