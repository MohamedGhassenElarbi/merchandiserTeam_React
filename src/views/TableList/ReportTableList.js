import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReportTable from 'components/Table/ReportTable';
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

export default function ReportTableList() {
  const classes = useStyles();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/report`)
        .then(res => {
            console.log(res.data);
            const reportsData = res.data;
            setReports(reportsData);
        })
}, [])


const handleRemove=(id) =>{
  api.delete(`http://localhost:8080/api/v1/report/${id}`)
    .then(res => {
      const newReports = reports.filter(report => id !== report.id)
      setReports(newReports)
  })
    .catch(err => {
      console.log(err);
    });
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Rapports</h4>
            <p className={classes.cardCategoryWhite}>
            Les Rapports:
            </p>
          </CardHeader>
          <CardBody>
            <ReportTable reports={reports} handleRemove={handleRemove}/>
          </CardBody>
        </Card>
      </GridItem>
  );
}
