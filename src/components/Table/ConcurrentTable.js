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
import DeleteConcurrentDialog from '../DeleteConcurrentDialog'
import UpdateConcurrentFormDialog from '../UpdateConcurrentFormDialog'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ConcurrentTable({concurrents,handleRemove,setConcurrents}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Désignation</TableCell>
            <TableCell align="right">Categorie</TableCell>
            <TableCell align="right">GMS</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {concurrents.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.categories[0].nom}</TableCell>
              <TableCell align="right">{row.gms[0].name}</TableCell>
              
              
              <TableCell align="right">
              {/* <IconButton aria-label="delete">
              <DetailIcon color="primary"/>
              </IconButton> */}
              
              <UpdateConcurrentFormDialog id={row.id} setConcurrents={setConcurrents}/>
              
              <DeleteConcurrentDialog id={row.id} handleRemove={handleRemove}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}