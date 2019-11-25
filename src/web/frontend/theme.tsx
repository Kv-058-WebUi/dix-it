import red from '@material-ui/core/colors/red';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';


// A custom theme for this app
let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});


theme = responsiveFontSizes(theme);

export default theme;
