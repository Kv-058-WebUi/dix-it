import React from 'react';
import { makeStyles, Theme, createStyles, createMuiTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './TimeBar.scss'
import { MuiThemeProvider } from '@material-ui/core/styles';

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
export default function LinearDeterminate() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = 0.1 * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
        <MuiThemeProvider theme={myTheme}>
      <LinearProgress variant="determinate" value={completed} color="secondary" /></MuiThemeProvider>
    </div>
  );
}