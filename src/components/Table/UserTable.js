import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import DeleteUserDialog from '../DeleteGMSDialog';
import UpdateUserFormDialog from '../UpdateUserFormDialog';
import GMSDetailsFormDialog from '../GMSDetailsFormDialog';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserTable({users,handleRemove,setUsers}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Date de Naissance</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.dob}</TableCell>
              
              
              <TableCell align="right">
              {/* <IconButton aria-label="delete">
              <DetailIcon color="primary"/>
              </IconButton> */}
              {/* <GMSDetailsFormDialog/> */}
              <UpdateUserFormDialog id={row.id} setUsers={setUsers}/>
              
               <DeleteUserDialog id={row.id} handleRemove={handleRemove}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}