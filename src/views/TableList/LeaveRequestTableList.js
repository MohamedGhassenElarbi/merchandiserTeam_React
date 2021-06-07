import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import LeaveRequestTable from 'components/Table/LeaveRequestTable';
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

export default function LeaveRequestTableList() {
  const classes = useStyles();
  const [leaveRequests, setLeaveRequests] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/leave`)
        .then(res => {
            const leaveRequestsData = res.data;
            setLeaveRequests(leaveRequestsData);
            console.log(leaveRequestsData);
        })
}, [])


const handleRemove=(id) =>{
    axios.delete(`http://localhost:8080/api/v1/leave/${id}`)
    .then(res => {
      const newLeaveRequests = leaveRequests.filter(leaveRequest => id !== leaveRequest.id)
      setLeaveRequests(newLeaveRequests)
  })
    .catch(err => {
      console.log(err);
    });
  }
  return (
    
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des demandes de congés</h4>
            <p className={classes.cardCategoryWhite}>
            Demandes de congés:
            </p>
          </CardHeader>
          <CardBody>
            <LeaveRequestTable leaveRequests={leaveRequests} setLeaveRequests={setLeaveRequests} handleRemove={handleRemove}/>
          </CardBody>
        </Card>
      </GridItem>
  );
}
