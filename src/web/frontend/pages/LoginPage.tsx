import React, { Component } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="Dixit Game image"
          height="100%"
          image={require ("../images/Frame 8.png")}
        />
     
    </Card>
  );
}

