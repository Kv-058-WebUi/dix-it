import React, { Component, useContext } from 'react';
import { Link } from "react-router-dom";
import './UserNav.scss';
import UserProvider from '../../UserProvider/UserProvider';
import path from 'path';
import UserPopover from './UserPopover/UserPopover';

function UserNav() {
    return (
        <UserProvider.context.Consumer>{context => (
            <React.Fragment>
                {context.user && context.user.authenticated
                    ? (<React.Fragment>
                        <div className="UserNav__profile_picture">
                            <img alt='profile picture' src={path.normalize(`/images/avatars/${context.user.profile_picture || 'anonymous_user.png'}`)}/>
                        </div>
                        <UserPopover context={context}/>
                    </React.Fragment>)
                    : ''}
            </React.Fragment>
        )}</UserProvider.context.Consumer>
    );
};

export default UserNav;