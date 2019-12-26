import React from 'react';
import { makeStyles, Theme, createStyles, createMuiTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './TimeBar.scss'
import { MuiThemeProvider } from '@material-ui/core/styles';
import {TimerPlusPlus, RestartTimer} from '../../GameBoard/GameBoard';

interface timerInterface {
  timerState: number,
  restartTimer: RestartTimer,
  timerPlusPlus: TimerPlusPlus,
  socket: SocketIOClient.Socket
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& >*': {
        borderRadius:"30px",
        boxShadow: '0px 0px 20px #FFFFFF',
        colorSecondary: 'rgb(249,55,85)',
        colorPrimary: 'rgb(163,35,62)',
        marginTop:'10px',
        width:'442px'
      },
    },
  }),
);

const myTheme = createMuiTheme({
    overrides: {
        MuiLinearProgress: createStyles({
            root:{
                colorSecondary: 'rgb(249,55,85)',
                colorPrimary: 'rgb(163,35,62)',
                margin: 'auto',
            },
            barColorSecondary:{
                backgroundColor: 'rgb(249,55,85)'
            },
            colorSecondary:{
                backgroundColor: 'rgb(163,35,62)'
            }
        })
    }
  });
export default function LinearDeterminate(props: timerInterface) {
  const classes = useStyles();
  let {timerState} = props;
  // props.socket.emit('Synchronize timer', timerState)
  if(timerState === 100) {
    props.restartTimer()
  }
  React.useEffect(() => {
    function progress() {
      const diff = 0.1 * 10;
      return props.timerPlusPlus(diff);
    }
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div className={classes.root}>
        <MuiThemeProvider theme={myTheme}>
         <LinearProgress variant="determinate" value={timerState} color="secondary" /></MuiThemeProvider>
    </div>
  );
}