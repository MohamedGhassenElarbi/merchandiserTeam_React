import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteReclamationDialog from '../DeleteReclamationDialog';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReclamationTable({reclamations,handleRemove}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Type reclamation</TableCell>
            <TableCell align="right">Contenue</TableCell>
            <TableCell align="right">GMS</TableCell>
            <TableCell align="right">Merchandiser</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reclamations.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.type.name}</TableCell>
              <TableCell align="right">{row.content}</TableCell>
              <TableCell align="right">{row.gms.name}</TableCell>
              <TableCell align="right">{row.merchandiser.name}</TableCell>
              <TableCell align="right"><DeleteReclamationDialog id={row.id} handleRemove={handleRemove}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>     
    </TableContainer>
  );
}