import React from 'react';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ContextData } from '../../../UserProvider/UserProvider';
import { withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const PopoverButton = withStyles((theme: Theme) => ({
    root: {
        color: '#fff',
        fontSize: '20px',
        fontFamily: 'Montserrat Alternates',
        textTransform: 'none',
    },
}))(Button);

const PopoverMenu = withStyles({
    paper: {
        boxShadow: "0px 0px 10px rgba(171, 156, 156, 0.87)",
        backgroundColor: "rgba(21, 7, 16, 0.87)",
        color: "#fff",
    },
})(Menu);

const PopoverMenuItem = withStyles(theme => ({
    root: {
        fontSize: '20px',
        fontFamily: 'Montserrat Alternates',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            fontSize: '20px',
            fontFamily: 'Montserrat Alternates',
        },
        '&:hover': {
            backgroundColor: "rgba(60, 21, 47, 0.87)",
        }
    },
}))(MenuItem);


interface UserPopoverProps {
    context: ContextData
}

function UserPopover(props: UserPopoverProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setIsActive(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsActive(false);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('jwt_token');
        props.context.updateContext()
    };

    const handleSuggestCard = () => {
        handleClose();
        window.location.href = '/ng/upload';
    };

    return (
        <React.Fragment>
            <PopoverButton
                aria-controls="user-popover-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <a href='#'>{props.context.user?.nickname}</a>
                {isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </PopoverButton>
            <PopoverMenu
                id="user-popover-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <PopoverMenuItem onClick={handleLogout}>Log out</PopoverMenuItem>
                <PopoverMenuItem onClick={handleSuggestCard}>Suggest a card</PopoverMenuItem>
            </PopoverMenu>
        </React.Fragment>
    );

};

export default UserPopover;