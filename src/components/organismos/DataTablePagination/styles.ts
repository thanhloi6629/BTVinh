import {
    createStyles, makeStyles, Theme,
  } from '@material-ui/core/styles';
  
export const useTableStyles = makeStyles((theme: Theme) => createStyles({
    stickyTableCell: {
      '& th:': {
        top: 0,
        left: 0,
        position: 'sticky',
        backgroundColor: theme.palette.primary.dark,
      },
      '& th:first-child': {
      //   top: 0,
      //   left: 0,
      //   position: 'sticky',
      //   backgroundColor: theme.palette.primary.light,
      },
        // '& td:first-child': {
        //   left: 0,
        //   position: 'sticky',
        // },
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
      table: {
        tableLayout: 'fixed',
        // width: 'max-content',
        overflowX: 'hidden',
        maxHeight: '600px',
        overflowY: 'auto',
        // minWidth: '100%',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: '8px',
          width: '8px',
          background: '#E5E5E5',
          borderRadius: '10px',
          marginTop: '10px',
          marginBottom: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#606060',
          borderRadius: '10px',
          height: '8px',
          width: '8px',
        },
        '& thead': {
          position: 'sticky',
          top: 0,
          zIndex: 9,
          backgroundColor: '#DCDCDC',
        },
      },
      tableTh: {
        color: theme.palette.grey.A400,
        '& svg': {
          color: '#000!important',
        },
      },
      hiddenCheckBox: {
        opacity: 0,
        pointerEvents: 'none',
      },
}))