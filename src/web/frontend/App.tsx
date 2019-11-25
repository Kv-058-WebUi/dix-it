import React, {useState} from "react";
import {BrowserRouter, Route, Switch, RouteComponentProps, Router } from 'react-router-dom';
import ReactDOM from "react-dom";
import { AppBar, Badge, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, withWidth } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import NavTabs from "./components/NavTabs";
import withRoot from "./withRoot";
import { history } from "./configureStore";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// import "./css/main.css";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';


function Routes() {
	const classes = useStyles({});

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/login" component={LoginPage} />
			<Route exact={true} path="/game" component={GamePage} />
		</div>
	);
}


const App = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div className="App">
 
        <Router history={history}>
			<Box
        bgcolor="background.paper"
        color="text.primary"
        p={2}
        position="absolute"
        top={100}
        left="10%"
        zIndex="modal"
		  >
			<NavTabs />
		</Box>
				
			<div>
				<Routes />
			</div>
		</Router>
		
		</div>
	
	

	);


};


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		// marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			// marginTop: 64,
		},
	},
}));



export default App;
