import React, { Component, useContext } from 'react';
import './UserNav.scss';
import UserProvider from '../../UserProvider/UserProvider';

function UserNav() {

    const handleLogOut = () => {
        localStorage.removeItem('jwt_token');
        location.href = '/';
    }

    return (
        <UserProvider.context.Consumer>{context => (
            <React.Fragment>
                {context.user && context.user.authenticated
                    ? (<React.Fragment>
                        <div className="UserNav__profile_picture">
                            <img alt='profile picture' src={context.user.profile_picture || ''}/>
                        </div>
                        <a href='#'>{context.user.nickname}</a>
                        {context.user.authenticated ? (<a href='#' onClick={handleLogOut}>Log out</a>) : ''}
                    </React.Fragment>)
                    : ''}
            </React.Fragment>
        )}</UserProvider.context.Consumer>
    );

};

export default UserNav;