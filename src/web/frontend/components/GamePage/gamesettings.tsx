import React, {useState} from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../GamePage/gamesettings.scss';

export default function GameSettings() {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const displayMenu = () => {
        if(showMenu) {
            return (
                <ul className={'game-settings__list'}>
                    <li className={'game-settings__item'}>
                        <button className={'game-settings__btn'} type={'button'}>
                            <HelpOutlineIcon style={{ fill: '#fff' }}/>
                        </button>

                    </li>
                    <li className={'game-settings__item'}>
                        <button className={'game-settings__btn'} type={'button'}>
                            <ExitToAppIcon fill={'#fff'} style={{ fill: '#fff' }}/>
                        </button>
                    </li>
                </ul>
            );
        }
    };

    return (
        <div className={'game-settings'}>
            <button className={'game-settings__btn'} onClick={() => toggleMenu()} type={'button'}>
                <SettingsIcon color={'primary'}/>
            </button>
            {displayMenu()}
        </div>
    );
}