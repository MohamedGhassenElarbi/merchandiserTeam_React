import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import UserTable from 'components/Table/UserTable';
import AddUserFormDialog from 'components/AddUserFormDialog'
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
            <UserTable setUsers={setUsers} users={users} handleRemove={handleRemove}/>

            
            
          </CardBody>
        </Card>
      </GridItem>
    
  );
}
