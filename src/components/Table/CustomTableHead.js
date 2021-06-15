import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function CustomTableHead ({colomnNames}){
    return(
        <TableHead>
          <TableRow>
            <TableCell>{colomnNames[0]}</TableCell>
            {colomnNames.map((title,index)=>{
                if(index!=0)
                return <TableCell align="right">{title}</TableCell>
            })} 
          </TableRow>
        </TableHead>
    );
}