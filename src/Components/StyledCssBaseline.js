import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "rgba(24,173,54,0.28)",
          height: "100vh",
          overflow: "hidden"
        }
      }
    },
    MuiContainer: {
      root: {
        height: "100vh"
      }
    }
  }
});

export default theme;
