import {
    createStyles, makeStyles, Theme,
  } from '@material-ui/core/styles';
  
export const useTableStyles = makeStyles((theme: Theme) => createStyles({
    stickyTableCell: {
        '& th:first-child': {
          left: 0,
          position: 'sticky',
          backgroundColor: theme.palette.primary.light,
        },
        '& td:first-child': {
          left: 0,
          position: 'sticky',
        },
        '&:not(.Mui-selected) td:first-child': {
          backgroundColor: theme.palette.background.paper,
        },
        '&.Mui-selected td:first-child': {
          backgroundColor: '#fdedf3',
        },
        '&:not(.Mui-selected):hover td:first-child': {
          backgroundColor: '#f5f5f5',
        },
      },
}))