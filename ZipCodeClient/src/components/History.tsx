import {Typography} from "@mui/material";
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface HistoryElement {
    zipCode:string,
    city:string,
    state:string
}

function History({history}:{history: HistoryElement[]}) {
    return(
        <React.Fragment>
            {history?.length>0 ? <Typography variant={'h4'} className={'Title'}>History</Typography> : null}
            {
                history?.length>0 &&
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Zip code</TableCell>
                                    <TableCell align="right">State</TableCell>
                                    <TableCell align="right">City</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((row) => (
                                    <TableRow
                                        key={Math.floor(Math.random()*50)}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.zipCode}
                                        </TableCell>
                                        <TableCell align="right">{row.state}</TableCell>
                                        <TableCell align="right">{row.city}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }

        </React.Fragment>
    );

}

export default History;