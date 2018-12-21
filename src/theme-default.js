import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 67,
    color: blue600
  },
  drawer: {
    width: 230,
    color: "#fff"
  },
  raisedButton: {
    primaryColor: blue600,
  }
});

export default themeDefault;