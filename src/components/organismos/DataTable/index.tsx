import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  createStyles, lighten, makeStyles, Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { BorderAllRounded } from '@material-ui/icons';
import {
  Order, DataTableProps,
} from './interface';
import { useTableStyles } from './styles';
import DataTableHead from './DataTableHead';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable({
  data,
  columns = [],
  onItemSelect,
  onItemDelete,
  onItemSelectAll,
  selectedRowsIndex = [],
  showDeleteAndCheckBoxIcon = true,
  rowsPerPageOptions = [25, 50, 100],
  nonDataText = 'データはありません。',
  isSelectedRowCheckBox = false,
  showPagination = true,
  showTablePagination = true,
  isSelectedOnlyCheckBox = false,
  isOnlyShowCheckIcon = false,
  isCustomerTable = false,
  isSticky = false,
  haveBorderRight = false,
  haveBorderRightWithDeleteCheckbox = false,
  isTableLogoSetting = false,
  widthTable = '100%',
  rowColor = '',
  hasBorderNotForCheckBox = false,
  hidePaginationBox = false,
  showSelectedAll = true,
  rowsPerPageDefault = rowsPerPageOptions[0],
}: DataTableProps) {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageDefault || 10);
  const calcTotalPage = useMemo(() => Math.ceil(data.length / rowsPerPage), [data.length, rowsPerPage]);

  const [checkBoxStatus, setCheckboxStatus] = React.useState<boolean[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const chunkArray = (array: number[], number: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += number) {
      result.push(array.slice(i, i + number));
    }
    return result;
  };


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, pageIndex: number) => {
    const selectedRows = data.map((_, index) => index);
    const selectedRowsPerPage = chunkArray(selectedRows, rowsPerPage);
    const newSelecteds = selectedRowsPerPage[pageIndex];

    const changeCheckBoxStatus = checkBoxStatus.map((item, index) => {
      if (index === pageIndex) {
        return !item;
      }
      return item;
    });
    setCheckboxStatus(changeCheckBoxStatus);

    const uniqSelectedIndex = new Set(selected.concat(newSelecteds));// concat and ensure uniq val
    let totalSelectedArr = Array.from(uniqSelectedIndex);// convert Set to Array
    if (!changeCheckBoxStatus[pageIndex]) {
      totalSelectedArr = selected.filter((item) => !newSelecteds.includes(item));
    }

    setSelected(totalSelectedArr);
    if (onItemSelectAll) {
      onItemSelectAll?.(totalSelectedArr);
    } else {
      onItemSelect?.(totalSelectedArr);
    }
  };

  const handleEmptyFunction = (): void => {};

  const handleClick = (event: React.MouseEvent<unknown>, i: number) => {
    const selectedIndex = selected.indexOf(i);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = isSelectedOnlyCheckBox ? [i] : newSelected.concat(selected, i);
    } else if (selectedIndex === 0) {
      newSelected = isSelectedOnlyCheckBox ? [] : newSelected.concat(selected.slice(1));
    } else if (selectedIndex > 0) {
      newSelected = isSelectedOnlyCheckBox ? [] : newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }


    const changeCheckBoxStatus = [...checkBoxStatus];
    changeCheckBoxStatus[page] = false;
    setCheckboxStatus(changeCheckBoxStatus);
    setSelected(newSelected);
    // setSelectedResult(newSelected);
    onItemSelect?.(newSelected);
  };

  /**
   * Zero-based index
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * 1-based index
   */
  const handleChangePaginationPage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRowsPerPage(parseInt(event.target.value, rowsPerPageOptions[0] || 10));
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const isSelected = (index: number) => selected.indexOf(index) !== -1;

  const handleDelete = () => {
    try {
      if (onItemDelete) {
        onItemDelete();
      } else {
        const cloneSelected = [...selected];

        while (cloneSelected.length > 0) {
          const s = cloneSelected.pop();
          if (s !== undefined) data.splice(s, 1);
        }
      }
    } catch (error) {
      // do nothing
    } finally {
      // setSelected([]);
    }
  };

  useEffect(() => {
    setCheckboxStatus(Array(calcTotalPage || 1).fill(false));// if calcTotalPage is 0, set to 1
    setPage(0);
    setSelected([]);
  }, [calcTotalPage, data]);

  /**
   * Reset selected row if needed
   */
  useEffect(() => {
    if (selectedRowsIndex.length || (selectedRowsIndex.length === 0 && !!selected.length && isCustomerTable)) {
      setSelected(selectedRowsIndex);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowsIndex]);
  return (
    <div className={classes.root}>
      <Box position="relative" height="50px" className={hidePaginationBox ? classes.hidePagiBox : ''}>
        {data.length > 0 && showDeleteAndCheckBoxIcon && !isSelectedOnlyCheckBox && (
          <Tooltip
            title="Delete"
            className={classes.tableTooltipDelete}
            onClick={handleDelete}
          >
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}

        {showPagination && (
        <Pagination
          classes={{
            root: classes.pagination,
          }}
          color="primary"
          count={calcTotalPage}
          page={page + 1}
          // boundaryCount={1}
          // siblingCount={1}
          onChange={handleChangePaginationPage}
        />
        )}
      </Box>

      <Paper className={isSelectedOnlyCheckBox ? classes.tableOnly : ''}>
        <TableContainer className={clsx({ [classes.stickyTableFull]: true }, { [classes.tableOnly]: isSelectedOnlyCheckBox }, { [classes.tableContainer]: !isSelectedOnlyCheckBox })}>
          <Table
            className={clsx(isTableLogoSetting ? classes.tableLogoSetting : classes.table, { [classes.stickyTableBody]: isSticky })}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            style={{ width: widthTable }}
          >
            {
              checkBoxStatus && checkBoxStatus.slice(page, page + 1).map((item, index) => (
                <DataTableHead
                  key={String(index)}
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={(e) => {
                    handleSelectAllClick(e, page);
                  }}
                  onRequestSort={handleRequestSort}
                  rowCount={selected.length || rowsPerPage}
                  columns={columns}
                  selectedPageStatus={item}
                  showDeleteAndCheckBoxIcon={data.length > 0 ? showDeleteAndCheckBoxIcon : false}
                  isSelectedOnlyCheckBox={isSelectedOnlyCheckBox}
                  isOnlyShowCheckIcon={isOnlyShowCheckIcon}
                  isSticky={isSticky}
                  haveBorderRight={haveBorderRight}
                  haveBorderRightWithDeleteCheckbox={haveBorderRightWithDeleteCheckbox}
                  hasBorderNotForCheckBox={hasBorderNotForCheckBox}
                  isHaveData={data.length > 0}
                  showSelectedAll={showSelectedAll}
                />
              ))
            }

            <TableBody style={{ backgroundColor: `${rowColor}` }}>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">{nonDataText}</TableCell>
                </TableRow>
              )
                : stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index) => {
                    const indexInTotal = index + page * rowsPerPage;
                    const isItemSelected = isSelected(indexInTotal);
                    const labelId = `enhanced-table-checkbox-${indexInTotal}`;
                    return (
                      <TableRow
                        hover={true}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={labelId}
                        selected={isItemSelected}
                        className={clsx({ [classes.stickyTableCell]: isSticky })}
                        onClick={(event) => {
                          isSelectedRowCheckBox ? handleClick(event, indexInTotal) : handleEmptyFunction();
                        }}
                      >
                        {showDeleteAndCheckBoxIcon && (
                          <TableCell padding="checkbox" width="5%">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={(event) => {
                                !isSelectedRowCheckBox ? handleClick(event, indexInTotal) : handleEmptyFunction();
                              }}
                            />
                          </TableCell>
                        )}
                        {isOnlyShowCheckIcon && !showDeleteAndCheckBoxIcon && (
                          <TableCell padding="checkbox" className={classes.stickyTableCell}>
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={(event) => {
                                !isSelectedRowCheckBox ? handleClick(event, indexInTotal) : handleEmptyFunction();
                              }}
                            />
                          </TableCell>
                        )}
                        {columns.map((col, i) => (col.content(row, i, indexInTotal)))}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {showTablePagination && (
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        classes={{
          caption: classes.bottomPagination,
        }}
      />
      )}
    </div>
  );
}
