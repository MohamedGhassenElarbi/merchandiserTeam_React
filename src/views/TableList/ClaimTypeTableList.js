import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddClaimTypeFormDialog from 'components/AddClaimTypeFormDialog'
import api from 'api';
import CustomTable from 'components/Table/CustomTable';
import TableCell from '@material-ui/core/TableCell';
import UpdateClaimTypeFormDialog from 'components/UpdateClaimTypeFormDialog'

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

export default function ClaimTypeTableList() {
  const classes = useStyles();
  const [claimTypes, setClaimTypes] = useState([]);
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/claimtype`)
        .then(res => {
            const claimTypesData = res.data;
            setClaimTypes(claimTypesData);
        })
}, [])


const handleRemove=(id) =>{
  api.delete(`http://localhost:8080/api/v1/claimtype/${id}`)
    .then(res => {
      const newClaimTypes = claimTypes.filter(claimType => id !== claimType.id)
      setClaimTypes(newClaimTypes)
  })
    .catch(err => {
      console.log(err);
    });
  }

  const colomnNames=[{id:"id",label:"Id",disablePadding: true},{id:"name",label:"Type de reclamation", disablePadding: false},{id:"op",label:"Opérations", disablePadding: false}];
  const tableBody= (row)=>{
    return(<>
    <TableCell component="th" scope="row" >{row.id}</TableCell>
    <TableCell align="right">{row.name}</TableCell>
    </>);
  }

  const returnUpdateComponent=(id,setClaimTypes)=>{
    return (<UpdateClaimTypeFormDialog id={id} setClaimTypes={setClaimTypes}/>);
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <AddClaimTypeFormDialog setClaimTypes={setClaimTypes}/>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste types de réclamations</h4>
            <p className={classes.cardCategoryWhite}>
            Types de réclamations:
            </p>
          </CardHeader>
          <CardBody>
            <CustomTable entityList={claimTypes} setEntityList={setClaimTypes} handleRemove={handleRemove} colomnNames={colomnNames} tableBody={tableBody} returnUpdateComponent={returnUpdateComponent} message={"cette type de réclamation"}/>
          </CardBody>
        </Card>
      </GridItem>
  );
}
