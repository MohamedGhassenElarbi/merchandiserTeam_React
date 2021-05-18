import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import ProgressBar from "components/ProgressBar/ProgressBar";



const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    },
    card :{
        width:"300"
    }

  };
  
  const useStyles = makeStyles(styles);

export default function MonthlyGoalCard() {
  const classes = useStyles();

  return (
    <Card profile style={{width: "300px",marginRight:"10px"}}>
    <CardAvatar profile>
      <a href="#pablo" onClick={e => e.preventDefault()}>
        <img src={avatar} alt="..." />
      </a>
    </CardAvatar>
    <CardBody profile>
      <h6 className={classes.cardCategory}>Merchandiseur</h6>
      <h4 className={classes.cardTitle}>Alec Thompson</h4>
      <ProgressBar></ProgressBar>
      <ProgressBar></ProgressBar>
      {/* <Button color="primary" round>
        Follow
      </Button> */}
    </CardBody>
  </Card>
  );
}