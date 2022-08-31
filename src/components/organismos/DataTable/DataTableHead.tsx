/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { DataTableHeadProps } from './interface';

export default function DataTableHead({
  classes,
  onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  columns, selectedPageStatus, showDeleteAndCheckBoxIcon, isSelectedOnlyCheckBox,
  isOnlyShowCheckIcon, isSticky, haveBorderRight, haveBorderRightWithDeleteCheckbox, hasBorderNotForCheckBox,
  isHaveData, showSelectedAll,
}: DataTableHeadProps) {
  // const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
  //   onRequestSort(event, property);
  // };
  return (
    <TableHead className={classes.tableHead}>
      <TableRow
        className={
          `${clsx({ [classes.stickyTableCell]: isSticky })} 
        ${(!isHaveData && haveBorderRightWithDeleteCheckbox === true)
            ? classes.borderRightLineTableCellWithDeleteCheckboxHaveFirst
            : ((isHaveData && haveBorderRightWithDeleteCheckbox === true) ? classes.borderRightLineTableCellWithDeleteCheckbox : '')}
        ${hasBorderNotForCheckBox ? classes.borderRightTableCell : ''}
        ${haveBorderRight ? classes.borderRightLineTableCell : ''}`
        }
      >
        {showDeleteAndCheckBoxIcon && (
          <TableCell padding="checkbox" className={classes.widthTableHead}>
            {showSelectedAll && !isSelectedOnlyCheckBox && (
              <Checkbox
                className={classes.tableTh}
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={selectedPageStatus}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
                disabled={rowCount === 0}
              />
            )}

          </TableCell>
        )}
        {isOnlyShowCheckIcon && !showDeleteAndCheckBoxIcon && (
          <TableCell padding="checkbox">
            <Checkbox
              className={`${classes.tableTh} ${isOnlyShowCheckIcon ? classes.hiddenCheckBox : ''}`}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={selectedPageStatus}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
              disabled={rowCount === 0}
            />
          </TableCell>
        )}
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.alignCenterTitle ? 'center' : col.align}
            padding={col.disablePadding ?? 'default'}
            sortDirection={orderBy === col.id ? order : false}
            className={`${clsx(classes.tableTh)}`}
            width={col.width ?? 'auto'}
          >
            {/* <TableSortLabel
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : 'asc'}
              onClick={createSortHandler(col.id)}
              className={classes.tableTh}
            > */}
            {col.label}
            {/* {orderBy === col.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
