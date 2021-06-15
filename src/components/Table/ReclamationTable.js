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
import ReclamationDetailFormDialog from '../ReclamationDetailFormDialog';
import CustomTableHead from './CustomTableHead'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReclamationTable({reclamations,handleRemove}) {
  const classes = useStyles();
  const colomnNames=["id","Type de reclamation","GMS","Merchandiser","Opérations"];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <CustomTableHead colomnNames={colomnNames}></CustomTableHead>
        <TableBody>
          {reclamations.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.type.name}</TableCell>
              <TableCell align="right">{row.gms.name}</TableCell>
              <TableCell align="right">{row.merchandiser.name}</TableCell>
              <TableCell align="right">
                <ReclamationDetailFormDialog image={row.image} content={row.content} name={"Réclamation"}/>
                <DeleteDialog id={row.id} handleRemove={handleRemove}removedElementName={"cette réclamation"}/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>     
    </TableContainer>
  );
}