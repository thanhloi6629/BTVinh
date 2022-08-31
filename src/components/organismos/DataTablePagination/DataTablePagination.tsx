import * as React from 'react';
import { Box, Checkbox } from '@material-ui/core';
import TablePagination from '@mui/material/TablePagination';
import { DataTableProps } from './interface';
import DataTableGrid from './DataTableGrid';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { useTableStyles } from './styles';


const DataTablePagination = ({
  columns, 
  data,
  selectedRows = [],
  nonDataText = 'データはありません。',
  labelGetIdForCheckIcon = '',
  isShowCheckBoxIcon = false,
  isCheckedAll=false,
  onItemSelect,
  onItemSelectAll,
  isSticky

}: DataTableProps) => {
  console.log("data", data);
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useTableStyles();

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null,newPage: number) => {
      setPage(newPage);
    };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("event", event.target.value);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const isSelected = (valueRow: string) => selectedRows?.includes(valueRow);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
    const actionChecked = (event.target as HTMLInputElement).checked;
    console.log("actionChecked", actionChecked);
    const valueRowCheck = row[`${labelGetIdForCheckIcon}`] || '';
    onItemSelect && onItemSelect({checked: actionChecked, value: valueRowCheck})
  }

  return (
    <div>
      <Box>
        <TableHead>
          <TableRow
            className={
              `${clsx({ [classes.stickyTableCell]: isSticky })} `
            }
          >
          {
            isShowCheckBoxIcon && (
              <TableCell padding="checkbox">
                <Checkbox 
                  className={`tenclass`}
                  checked={isCheckedAll}
                  onChange={(e) => onItemSelectAll && onItemSelectAll(e?.target?.checked)}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                  />
              </TableCell>
            )
          }
          {
            columns.map((col) => (
              <TableCell 
                key ={col.id}
                align={col?.align || 'center'}
                padding="default"
                // className={`${clsx(classes.tableTh)}`}
                width={col?.width ?? 'auto'}
              >
                {col?.label}
              </TableCell>
            ))
          }
          </TableRow>
        </TableHead> 

        <TableBody>
         {data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">{nonDataText}</TableCell>
            </TableRow>
          ) : (
            data?.map((row: any, index: number) => {
              const valueRow = row[`${labelGetIdForCheckIcon}`] || `${index}`;
              const isItemSelected = isSelected(valueRow);
              const labelId = `enhanced-table-checkbox-${index}`;
               return (
                <TableRow 
                  hover={true}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  {
                    isShowCheckBoxIcon && (
                      <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(event, row)}
                      />
                    </TableCell>
                    )
                  }
                  {
                    columns.map((col, i) => col.content(row,i,index))
                  }
                </TableRow>
                )
            } )
          )
        }
        </TableBody>

      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      
      

        <DataTableGrid />
    </div>
  )
}

export default DataTablePagination
