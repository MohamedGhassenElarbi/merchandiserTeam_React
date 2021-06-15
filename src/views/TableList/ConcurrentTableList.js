import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddConcurrentFormDialog from 'components/AddConcurrentFormDialog'
import api from 'api';
import CustomTable from 'components/Table/CustomTable';
import TableCell from '@material-ui/core/TableCell';
import UpdateConcurrentFormDialog from 'components/UpdateConcurrentFormDialog'

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

export default function ConcurrentTableList() {
  const classes = useStyles();
  const [concurrents, setConcurrents] = useState([]);
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/competitor`)
        .then(res => {
            const concurrentsData = res.data;
            setConcurrents(concurrentsData);
        })
}, [])

const handleRemove=(id) =>{
  api.delete(`http://localhost:8080/api/v1/competitor/${id}`)
    .then(res => {
      const newConcurrents = concurrents.filter(concurrents => id !== concurrents.id)
      setConcurrents(newConcurrents)
  })
    .catch(err => {
      console.log(err);
    });
  }
  const colomnNames=[{id:"id",label:"Id",disablePadding: true},{id:"name",label:"Nom", disablePadding: false},{id:"op",label:"Opérations", disablePadding: false}];
  const tableBody= (row)=>{
    return(<>
    <TableCell component="th" scope="row" >{row.id}</TableCell>
    <TableCell align="right">{row.name}</TableCell>
    </>);
  }

  const returnUpdateComponent=(id,setConcurrents)=>{
    return (<UpdateConcurrentFormDialog id={id} setConcurrents={setConcurrents}/>);
  }
  return (
      <GridItem xs={12} sm={12} md={12}>
        <AddConcurrentFormDialog setConcurrents={setConcurrents}/>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Concurrents</h4>
            <p className={classes.cardCategoryWhite}>
            Concurrents:
            </p>
          </CardHeader>
          <CardBody>
            <CustomTable entityList={concurrents} setEntityList={setConcurrents} handleRemove={handleRemove} colomnNames={colomnNames} tableBody={tableBody} returnUpdateComponent={returnUpdateComponent} message={"ce concurrent"}/>
          </CardBody>
        </Card>
      </GridItem>
  );
}
