import React,{useState,useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import api from 'api';
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ReactChart from 'components/ReactChart.js'
import ClaimChart from 'components/ClaimChart.js'
  
  const useStyles = makeStyles(styles);

export default function MonthlyGoal() {
  const classes = useStyles();
  const [NumberOfMerchandisers, setNumberOfMerchandisers] = useState()
  const [NumberOfClaims, setNumberOfClaims] = useState()
  const [NumberOfGMS, setNumberOfGMS] = useState()
  const [NumberOfReports, setNumberOfReports] = useState()
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/user/role/MERCHANDISER`)
        .then(res => {
            const usersData = res.data;
            setNumberOfMerchandisers(usersData.length);
            //console.log(usersData.length);

        })
    
    api.get(`http://localhost:8080/api/v1/reclamation`)
        .then(res => {
            const reclamationData = res.data;
            setNumberOfClaims(reclamationData.length);
            //console.log(reclamationData.length);

        })

    api.get(`http://localhost:8080/api/v1/gms`)
        .then(res => {
            const gmsData = res.data;
            setNumberOfGMS(gmsData.length);
        })

    api.get(`http://localhost:8080/api/v1/report`)
        .then(res => {
            const reportsData = res.data;
            setNumberOfReports(reportsData.length);
        })
}, [])

  return (
    <div >
        <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Rapports</p>
              <h3 className={classes.cardTitle}>
                {NumberOfReports}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>GMS</p>
              <h3 className={classes.cardTitle}>{NumberOfGMS}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Réclamations</p>
              <h3 className={classes.cardTitle}>{NumberOfClaims}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Merchandiseurs</p>
              <h3 className={classes.cardTitle}>{NumberOfMerchandisers}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>  
      <div style={{display:'flex'}}>
      <ReactChart></ReactChart>
      <ClaimChart></ClaimChart>
      </div>
    </div>
  );
}