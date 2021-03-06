import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GMSTable from 'components/Table/GMSTable';
import AddGMSFormDialog from 'components/AddGMSFormDialog'
import api from 'api';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function GMSTableList() {
  const classes = useStyles();
  const [gms, setGMS] = useState([]);
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/gms`)
        .then(res => {
            const gmsData = res.data;
            setGMS(gmsData);
        })
}, [])


const handleRemove=(id) =>{
    api.delete(`http://localhost:8080/api/v1/gms/${id}`)
    .then(res => {
      const newGMS = gms.filter(gms => id !== gms.id)
      setGMS(newGMS)
  })
    .catch(err => {
      console.log(err);
    });
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <AddGMSFormDialog setGMS={setGMS}/>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des GMS</h4>
            <p className={classes.cardCategoryWhite}>
              GMS:
            </p>
          </CardHeader>
          <CardBody>
            <GMSTable setGMS={setGMS} gms={gms} handleRemove={handleRemove}/>
          </CardBody>
        </Card>
      </GridItem>
  );
}
