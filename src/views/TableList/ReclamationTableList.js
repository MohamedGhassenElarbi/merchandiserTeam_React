import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReclamationTable from 'components/Table/ReclamationTable';
import axios from 'axios';

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

export default function ReclamationTableList() {
  const classes = useStyles();
  const [reclamations, setReclamations] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/reclamation`)
        .then(res => {
            const reclamationData = res.data;
            setReclamations(reclamationData);
            console.log(reclamationData);

        })
}, [])

const handleRemove=(id) =>{
  axios.delete(`http://localhost:8080/api/v1/reclamation/${id}`)
  .then(res => {
    const newReclamations = reclamations.filter(reclamation => id !== reclamation.id)
    setReclamations(newReclamations)
})
  .catch(err => {
    console.log(err);
  });
}
  return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Réclamations</h4>
            <p className={classes.cardCategoryWhite}>
            Réclamations:
            </p>
          </CardHeader>
          <CardBody>
            <ReclamationTable reclamations={reclamations}handleRemove={handleRemove} />
          </CardBody>
        </Card>
      </GridItem>
  );
}
