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
import DeleteGMSDialog from '../DeleteGMSDialog';
import UpdateGMSFormDialog from '../UpdateGMSFormDialog';
import GMSDetailsFormDialog from '../GMSDetailsFormDialog';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GMSTable({gms,handleRemove,setGMS}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Désignation</TableCell>
            <TableCell align="right">Temps Estimée</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gms.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.estimatedTime}</TableCell>
              <TableCell align="right">{row.longitude}</TableCell>
              <TableCell align="right">{row.latitude}</TableCell>
              
              
              <TableCell align="right">
              {/* <IconButton aria-label="delete">
              <DetailIcon color="primary"/>
              </IconButton> */}
              <GMSDetailsFormDialog/>
              <UpdateGMSFormDialog id={row.id} setGMS={setGMS}/>
              
              <DeleteGMSDialog id={row.id} handleRemove={handleRemove}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}