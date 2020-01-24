import React from 'react';
import { makeStyles, Theme, createStyles, createMuiTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './TimeBar.scss'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { turnTimeMs } from '../../../../common/helpers';

interface timerInterface {
  timerState: number,
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
  const [completed, setCompleted] = React.useState(0);
  const classes = useStyles();
  const interval = 500;
  const step = 100 / (turnTimeMs / interval);
  
  React.useEffect(() => {
    if(props.timerState === 100) {
      setCompleted(0);
    } else if(props.timerState === 0) {
      function progress() {
          setCompleted(oldCompleted => {
            if (oldCompleted === 100) {
              clearInterval(timer);
              return 100;
            }
            return Math.min(oldCompleted + step, 100);
          });
      };

      const timer = setInterval(progress, 500);
      
      return () => {
        clearInterval(timer);
      };
    }
  },[props.timerState]);


  return (
    <div className={classes.root}>
        <MuiThemeProvider theme={myTheme}>
         <LinearProgress variant="determinate" value={completed} color="secondary" /></MuiThemeProvider>
    </div>
  );
}