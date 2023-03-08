import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { DrugChartData } from '../../../utils/chartsData';

interface DrugsGraphProps {
  rows: DrugChartData[];
}

export default function DrugsGraph({ rows }: DrugsGraphProps): JSX.Element {
  const [elevation, setElevation] = useState(2);
  return (
    <TableContainer
      elevation={elevation}
      sx={{ p: 2, height: '100%', minHeight: '250px' }}
      component={Paper}
      onMouseEnter={() => setElevation(8)}
      onMouseLeave={() => setElevation(2)}
    >
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Médicament</TableCell>
            <TableCell align="left">Qté</TableCell>
            <TableCell align="left">Unité</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.quantity}</TableCell>
              <TableCell align="left">{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
