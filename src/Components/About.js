import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import { styled } from "@material-ui/core/styles";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});

const BackButton = styled(Button)({
  marginTop: "auto",
});
const StyledLink = styled(Link)({
  color: "#000",
  textDecoration: "none",
});
const Div = styled(Box)({
  height: "80%",
  width: "80%",
  textAlign: "center",
});
const H2 = styled(Box)({
  fontSize: "2rem",
});
const P = styled(Box)({
  fontSize: "1rem",
  letterSpacing: "0.03571rem",
  lineHeight: "150%",
});

const A = styled(Box)({
  textDecoration: "none",
  color: "#aaa",
});

const About = () => {
  return (
    <Zoom in={true}>
      <OuterGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="about"
      >
        <Div className="about-container">
          <H2 component="h2" className="about-header">
            O aplikacji
          </H2>
          <P component="p" className="about-content">
            Witaj! Cieszę się, że tutaj jesteś drogi użytkowniku i tak jak ja,
            chciałbyś uczyć się języka japońskiego - a mianowicie podstawowych
            znaków.
          </P>
          <P component="p" className="about-content">
            Ta aplikacja powstała z myślą o możliwości uczenia się i utrwalania
            swojej wiedzy w każdym miejscu: czy to w komunikacji miejskiej, czy
            to w poczekalni do lekarza, a nawet na "nieciekawych" zajęciach ;)
          </P>
          <P component="p" className="about-content">
            Mam nadzieję, że aplikacja wspomoże Twoją naukę języka japońskiego,
            a także umili Ci czas przy przyswajaniu znaków. Miłej zabawy!
          </P>
          <P component="p" className="about-content">
            W projekcie wykorzystano grafiki:
            <p>
              {" "}
              <A component="a" href="http://www.freepik.com">
                Designed by macrovector_official / Freepik
              </A>
            </p>
            <p>
              {" "}
              Icons made by
              <A
                component="a"
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                {" "}
                Freepik{" "}
              </A>{" "}
              from{" "}
              <A
                component="a"
                href="https://www.flaticon.com/"
                title="Flaticon"
              >
                www.flaticon.com
              </A>
            </p>
          </P>
        </Div>

        <BackButton variant="contained">
          <StyledLink to="/home" component={Link} className="back-btn">
            Powrót
          </StyledLink>
        </BackButton>
      </OuterGrid>
    </Zoom>
  );
};

export default About;
