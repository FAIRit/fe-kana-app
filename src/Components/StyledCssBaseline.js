import { createMuiTheme } from "@material-ui/core/styles";
import picture from "../assets/4484.jpg";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "rgba(24,173,54,0.28)",
          backgroundImage: `url(${picture})`,
          backgroundSize: "100%",
          height: "100vh",
          color: "rgba(0,0,0, 0.87)",
        },
      },
    },
    MuiContainer: {
      root: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

export default theme;
