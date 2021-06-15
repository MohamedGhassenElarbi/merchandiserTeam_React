import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddUserFormDialog from 'components/AddUserFormDialog'
import api from 'api';
import CustomTable from 'components/Table/CustomTable';
import TableCell from '@material-ui/core/TableCell';
import UpdateUserFormDialog from 'components/UpdateUserFormDialog'

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

export default function UserTableList() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/user`)
        .then(res => {
            const usersData = res.data;
            setUsers(usersData);
            //console.log(gmsData);

        })
}, [])


const handleRemove=(id) =>{
  api.delete(`http://localhost:8080/api/v1/user/${id}`)
    .then(res => {
      const newUsers = users.filter(users => id !== users.id)
      setUsers(newUsers)
  })
    .catch(err => {
      console.log(err);
    });
  }

  const colomnNames=[{id:"name",label:"Name",disablePadding: true},{id:"email",label:"Email", disablePadding: false},{id:"phone",label:"Phone", disablePadding: false},{id:"role",label:"Role", disablePadding: false},{id:"dob",label:"Date de Naissance", disablePadding: false},{id:"op",label:"Opérations", disablePadding: false}];
  const tableBody= (row)=>{
    return(<>
    <TableCell component="th" scope="row">{row.name}</TableCell>
    <TableCell align="right">{row.email}</TableCell>
    <TableCell align="right">{row.phone}</TableCell>
    <TableCell align="right">{row.role}</TableCell>
    <TableCell align="right">{row.dob}</TableCell>
    </>);
  }

  const returnUpdateComponent=(id,setUsers)=>{
    return (<UpdateUserFormDialog id={id} setUsers={setUsers}/>);
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <AddUserFormDialog setUsers={setUsers}/>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des utilisateurs</h4>
            <p className={classes.cardCategoryWhite}>
              Utilisateurs:
            </p>
          </CardHeader>
          <CardBody>
            <CustomTable entityList={users} setEntityList={setUsers} handleRemove={handleRemove} colomnNames={colomnNames} tableBody={tableBody} returnUpdateComponent={returnUpdateComponent} message={"cet utilisateur"}/>
          </CardBody>
        </Card>
      </GridItem>
    
  );
}
