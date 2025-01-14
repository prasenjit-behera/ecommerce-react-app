import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

function createData(name: string,category: string,qty: number,price: number,subTotal: number) {
  return { name, category, qty, price, subTotal };
}

const rows = [
  createData('Wireless Mouse', 'Electronics', 2, 25, 50),
  createData('USB-C Cable', 'Accessories', 5, 8, 40),
  createData('Bluetooth Headphone', 'Electronics', 1, 120, 120),
  createData('Stainless Steel Water Bottle', 'Kitchen', 3, 90, 270),
  createData('T-shirt', 'Cloth', 1, 500, 1000)
];
const CustomSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
  
export default function CartItem() {

    const [headerChecked, setHeaderChecked] = useState<boolean>(false);
    const [rowSwitchStates, setRowSwitchStates] = useState<boolean[]>(rows.map(() => false));
      const handleHeaderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setHeaderChecked(isChecked);
        setRowSwitchStates(new Array(rowSwitchStates.length).fill(isChecked)); // Set all row switches based on header checkbox
      };
    
      // Handle individual row switch change
      const handleRowSwitchChange = (index: number) => {
        const updatedSwitchStates = [...rowSwitchStates];
        updatedSwitchStates[index] = !updatedSwitchStates[index];
        setRowSwitchStates(updatedSwitchStates);
        setHeaderChecked(updatedSwitchStates.every((state) => state)); // If all switches are on, check the header checkbox
      };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sub-total</TableCell>
            <TableCell align="right">View <Checkbox  checked={headerChecked}
                onChange={handleHeaderCheckboxChange}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.subTotal}</TableCell>
              <TableCell align="right"> 
        <FormControlLabel
        control={<CustomSwitch checked={rowSwitchStates[index]} />}
        label=""
        onChange={() => handleRowSwitchChange(index)}
      /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
