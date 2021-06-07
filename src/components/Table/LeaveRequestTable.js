import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteDialog from '../DeleteDialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function LeaveRequestTable({leaveRequests,handleRemove,setLeaveRequests}) {
  const classes = useStyles();
  const handleChangeLeaveRequest =(result,id)=>{
    axios.put(`http://localhost:8080/api/v1/leave/${id}`,{state:result} )
        .then(response => {
            axios.get(`http://localhost:8080/api/v1/leave`)
            .then(res => {
                setLeaveRequests(res.data); 
            })
        });
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Merchandiser</TableCell>
            <TableCell align="left">Date début</TableCell>
            <TableCell align="left">Date fin</TableCell>
            <TableCell align="left">Raison</TableCell>
            <TableCell align="left">Etat</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveRequests.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.requester.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.startDate}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.endDate}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.reason}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.state}
              </TableCell>
              <TableCell align="right">
              <IconButton aria-label="delete" onClick={()=>handleChangeLeaveRequest("ACCEPTED",row.id)} ><CheckIcon color="primary" /> </IconButton>
              <IconButton aria-label="delete" onClick={()=>handleChangeLeaveRequest("REFUSED",row.id)}><CloseIcon color="error" /></IconButton>
              <DeleteDialog id={row.id} handleRemove={handleRemove}removedElementName={"cette demande de congé"}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>     
    </TableContainer>
  );
}