import * as React from 'react';
import { Box, Checkbox, Paper, Table, TableContainer } from '@material-ui/core';
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
  isSticky= false,
  isSticky2 = false,
  handleChangePage,
  handleChangeSize,
  rowsPerPageOptions = [25, 50, 100],
  page = 1,
  size = rowsPerPageOptions[0],
  totalItem = 0,
  widthTable = '100%',
}: DataTableProps) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useTableStyles();
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
    };

    const isSelected = (valueRow: string) => selectedRows?.includes(valueRow);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => {
    const actionChecked = (event.target as HTMLInputElement).checked;
    const valueRowCheck = row[`${labelGetIdForCheckIcon}`] || '';
    onItemSelect && onItemSelect({checked: actionChecked, value: valueRowCheck})
  }


  const onChangePage = (event: unknown, newPage: number) => {
    handleChangePage(newPage + 1);
  };

  return (
    <div>

      <Box>
        <Paper>
          <TableContainer className={classes.table}>

            <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            style={{ width: widthTable }}
            >
            <TableHead>
              <TableRow >
              {
                isShowCheckBoxIcon && (
                  <TableCell padding="checkbox">
                    <Checkbox 
                      // className={`${classes.tableTh} ${!isShowCheckBoxIcon && classes.hiddenCheckBox }`}
                      checked={isCheckedAll}
                      defaultChecked
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
                    className={`${clsx(classes.tableTh)}`}
                    width={col.width?? 'auto'}
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
                          <TableCell 
                            padding="checkbox" 
                          >
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
                      {columns.map((col, i) => col.content(row,i,index))}
                    </TableRow>
                    )
                } )
              )
            }
            </TableBody>
            </Table>
          </TableContainer>
        </Paper>
     

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          count={totalItem}
          rowsPerPage={size}
          page={page - 1}
          onPageChange={onChangePage}
        />
      </Box>
      
      

        <DataTableGrid />
    </div>
  )
}

export default DataTablePagination
