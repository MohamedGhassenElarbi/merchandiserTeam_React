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
import UpdateGMSFormDialog from '../UpdateGMSFormDialog';
import GMSDetailsFormDialog from '../GMSDetailsFormDialog';
import CustomTableHead from './CustomTableHead'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function GMSTable({gms,handleRemove,setGMS}) {
  const classes = useStyles();
  const colomnNames=["Désignation","Temps Estimée","Latitude","Longitude","Opérations"];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <CustomTableHead colomnNames={colomnNames}></CustomTableHead>
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
              {/* <GMSDetailsFormDialog name={row.name} image={row.image}/> */}
              <UpdateGMSFormDialog id={row.id} setGMS={setGMS}/>
              
              <DeleteDialog id={row.id} handleRemove={handleRemove}removedElementName={"cette GMS"}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
    </TableContainer>
  );
}