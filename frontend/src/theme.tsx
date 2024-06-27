import commons from "./fonts/tt-commons-cufonfonts/TT-Commons-Medium.otf"
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: "commons"
      
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
    font-family: "Commons";
    src: url("/fonts/tt-commons-cufonfonts/TT-Commons-Medium.otf") format("opentype");
    font-size: 30px;
    font-weight: 400;
}
      `,
    },
  },
});

export default theme;