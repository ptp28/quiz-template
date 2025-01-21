import Body from "./Body.tsx";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from "react";
import {Card} from "@mui/material";

interface Column {
    id: 'name' | 'score' | 'time';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'score', label: 'Score', minWidth: 100},
    {id: 'time', label: 'Time Taken (mins)', minWidth: 100},
];

interface Data {
    name: string;
    score: number;
    time: number;
}

function createData(
    name: string,
    score: number,
    time: number,
): Data {
    return {name, score, time};
}

const rows = [
    createData('Aarav Patel', 780, 60),
    createData('John Doe', 600, 60),
    createData('Jane Smith', 500, 60),
    createData('Chris Brown', 500, 60),
    createData('Sarah Lee', 500, 60),
    createData('Australia', 500, 60),
    createData('David Thompson', 500, 60),
    createData('Sample Sandra', 500, 60),
    createData('Mei Wong', 500, 60),
    createData('Liam O’Connor', 450, 60),
    createData('Placeholder Pete', 400, 60),
    createData('United Kingdom', 300, 60),
    createData('Olivia Taylor', 90, 60),
    createData('Fatima Ahmed', 10, 60),
    createData('David Thompson', 10, 60),
];


export default function LeaderboardBody() {

    const title = "LEADERBOARD";

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Body icon={<LeaderboardIcon/>} title={title}>
            <Card
                sx={{
                    padding: "20px"
                }}
            >
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.primary.main,
                                            color: (theme) => theme.palette.primary.contrastText
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Body>
    );
}