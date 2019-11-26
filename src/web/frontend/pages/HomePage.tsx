import React, { Component } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import { KeyboardArrowRight } from '@material-ui/icons';




const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
  },
  button: {
    Width: "330px",
    Height: "100px",
    Background: "linear-gradient(90deg, #F27A54 0%, #A154F2 100%)",
    BorderRadius: "50px",
    TextTransform: "uppercase",
    Transition: "border, box-shadow .3s",
  },
  fab: {
    position: 'fixed',
    top: '35vh',
    left: '35vw',
    width: 330,
    height: 100,
    borderRadius: 50,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  const [boxColor, setBoxColor] = React.useState("red");

  const onButtonClick = () =>
  setBoxColor(boxColor === "red" ? "blue" : "red");


  return (
    <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="Dixit Game image"
          height='100vh'
          width='auto'
          image={require ("../images/Frame 1.png")}
        />
		  <Box >

        <Fab className="play-button"
        
        >
          PLAY
          <KeyboardArrowRight />
          
        </Fab>
        <Button size="small" color="primary">
          JOIN THE GAME
        </Button>
        <Button size="small" color="primary">
          CREATE ROOM
        </Button>
      </Box>
      
    </Card>
  );
}

