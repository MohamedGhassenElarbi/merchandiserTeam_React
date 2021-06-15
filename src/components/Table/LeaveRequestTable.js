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
import api from 'api';
import CustomTableHead from './CustomTableHead'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function LeaveRequestTable({leaveRequests,handleRemove,setLeaveRequests}) {
  const classes = useStyles();
  const handleChangeLeaveRequest =(result,id)=>{
    api.put(`http://localhost:8080/api/v1/leave/${id}`,{state:result} )
        .then(response => {
          api.get(`http://localhost:8080/api/v1/leave`)
            .then(res => {
                setLeaveRequests(res.data); 
            })
        });
  }
  const colomnNames=["Merchandiser","Date début","Date fin","Raison","Etat","Opérations"];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <CustomTableHead colomnNames={colomnNames}></CustomTableHead>
        <TableBody>
          {leaveRequests.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.requester.name}
              </TableCell>
              <TableCell align="right"component="th" scope="row">
                {row.startDate}
              </TableCell>
              <TableCell align="right"component="th" scope="row">
                {row.endDate}
              </TableCell>
              <TableCell align="right"component="th" scope="row">
                {row.reason}
              </TableCell>
              <TableCell align="right"component="th" scope="row">
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