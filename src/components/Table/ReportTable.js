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
import {format,parse} from 'date-fns';
import CustomTableHead from './CustomTableHead'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReportTable({reports,handleRemove}) {
  const classes = useStyles();
  const colomnNames=["id","Date","GMS","Merchandiser","Opérations"];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <CustomTableHead colomnNames={colomnNames}></CustomTableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right"component="th" scope="row">{format(new Date(row.dateTime), 'dd-MM-yyyy')}</TableCell>
              <TableCell align="right"component="th" scope="row">{row.gms.name}</TableCell>
              <TableCell align="right"component="th" scope="row">{row.merchandiser?.name}</TableCell>
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