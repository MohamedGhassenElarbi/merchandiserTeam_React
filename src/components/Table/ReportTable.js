import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteDialog from '../DeleteDialog'
import ReportDetailsFormDialog from '../ReportDetailsFormDialog';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReportTable({reports,handleRemove}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">GMS</TableCell>
            <TableCell align="left">Merchandiseur</TableCell>
            <TableCell align="right">Opérations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row">{row.gms.name}</TableCell>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right">
              <ReportDetailsFormDialog id={row.id}/>
              <DeleteDialog id={row.id} handleRemove={handleRemove}removedElementName={"cette rapport"}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>     
    </TableContainer>
  );
}