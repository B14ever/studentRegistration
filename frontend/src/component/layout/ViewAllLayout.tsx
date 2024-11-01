import { AddCircle } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState, useMemo } from 'react';
import { useRouting } from '../../utils/routing';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { formatDate } from '../../utils/dateForrmater';

type ViewAllLayoutProps = {
    data: {
        items: Array<{ [key: string]: any }>; 
        totalCount: number;
    } | null | undefined;
    currentPage: number; 
    setPage: (page: number) => void; 
    setLimit: (limit: number) => void; 
};

const ViewAllLayout: React.FC<ViewAllLayoutProps> = ({ data, currentPage, setPage, setLimit }) => {
    const { goTo } = useRouting();
    const [displayFilter, setDisplayFilter] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10); 
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});

    const handleDisplayFilter = () => {
        setDisplayFilter((prev) => !prev);
    };

    const isDataValid = data && Array.isArray(data.items) && data.items.length > 0;

   
    const tableHeaders = isDataValid ? Object.keys(data.items[0]).filter((key) => key !== '_id') : []; 
    const handleFilterChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValues({
            ...filterValues,
            [key]: event.target.value,
        });
    };

 
    const filteredItems = useMemo(() => {
        if (!isDataValid) return [];
        
        return data.items.filter((item) => {
            return tableHeaders.every((header) => {
                const filterValue = filterValues[header]?.toLowerCase() || '';
                const itemValue = String(item[header] ?? '').toLowerCase(); 

              
                if (typeof item[header] === 'string' && item[header].includes('-')) {
                    const formattedDate = formatDate(item[header]); 
                    return formattedDate.toLowerCase().includes(filterValue); 
                }

                return itemValue.includes(filterValue); 
            });
        });
    }, [data?.items, filterValues, tableHeaders, isDataValid]);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={6} >
                    <Button
                        variant="contained"
                        startIcon={<AddCircle />}
                        sx={{ boxShadow: 0 }}
                        onClick={() => goTo('add')}
                    >
                        Add
                    </Button>
                </Grid>
                <Grid size={6}>
                    <IconButton sx={{ float: 'right' }} onClick={handleDisplayFilter}>
                        <FilterAltIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 2 }} />
            {displayFilter && (
                <Grid container mt={2} gap={1}>
                    {/* Dynamic Filter Inputs */}
                    {tableHeaders.map((header) => (
                        <Grid
                          size={4}
                        key={header}>
                        <TextField
                            fullWidth
                            label={header}
                            variant="outlined"
                            size="small"
                            type={typeof data?.items[0][header] === 'string' && data?.items[0][header].includes('-') ? 'date' : 'text'} // Set input type for date headers
                            value={filterValues[header] || ''}
                            onChange={handleFilterChange(header)}
                            sx={{ mr: 2, mb: 2 }}
                            InputLabelProps={typeof data?.items[0][header] === 'string' && data?.items[0][header].includes('-') ? { shrink: true } : {}} // Adjust label for date input
                        />
                        </Grid>
                    ))}
                </Grid>
            )}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {isDataValid ? (
                                <>
                                    <TableCell>View</TableCell>
                                    {tableHeaders.map((header) => (
                                        <TableCell key={header}>
                                              {header.charAt(0).toUpperCase() + header.slice(1)}
                                            </TableCell>
                                    ))}
                                </>
                            ) : (
                                <TableCell>No Data Available</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <IconButton onClick={() => goTo(`${row._id}`)}>
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                    {tableHeaders.map((header) => (
                                        <TableCell key={header}>
                                            {typeof row[header] === 'string' && row[header].includes('-')
                                                ? formatDate(row[header])
                                                : row[header] ?? 'N/A'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={tableHeaders.length + 1}>
                                    <Typography variant="body2" color="textSecondary" align="center">
                                        No data available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {isDataValid && (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]} 
                    component="div"
                    count={filteredItems.length} // Updated to reflect filtered data
                    rowsPerPage={rowsPerPage} 
                    page={currentPage - 1} 
                    onPageChange={(event, newPage) => {
                        setPage(newPage + 1); 
                    }}
                    onRowsPerPageChange={(event) => {
                        const newLimit = parseInt(event.target.value, 10); 
                        setRowsPerPage(newLimit); 
                        setLimit(newLimit); 
                        setPage(1); 
                    }}
                />
            )}
        </Box>
    );
};

export default ViewAllLayout;
