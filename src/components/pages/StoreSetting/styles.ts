import { createStyles, makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({

    root: {
        flexGrow: 1,
        marginTop: '10px',
        position: 'relative',
      },
      roo1t1: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      tabBar: {
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
      },
      datepicker: {
        width: '220px',
        marginRight: '30px',
      },
      fontBold: {
        fontWeight: 700,
      },
      underline: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        padding: '1rem 3rem',
      },
      bottomButtons: {
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '14rem',
      },
      topButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      notchedOutline: {
        // NOTE: the legend element is a child of the notchedOutline component
        '& legend': {
          maxWidth: '1000px',
        },
      },
      ellipsisMenuItem: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      textBox: {
        marginTop: '15px',
      },
      pageLayout: {
        marginLeft: '2rem',
      },
      gridTop: {
        marginTop: '47px',
      },
      rootApp: {
        flexGrow: 1,
        width: '100%',
        background: 'white',
        color: theme.palette.primary.main,
        boxShadow: 'none',
        paddingLeft: '-32px',
        paddingRight: '-32px',
      },
      toolbar: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        padding: 0,
        fontWeight: 700,
      },
      tableEllipsis: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '300px',
        tableLayout: 'fixed',
        textAlign: 'left',
      },
      fontBoldabc: {
        fontWeight: 700,
      },
      text: {
        frontWeight: theme.typography.fontWeightBold,
      },
      textCenterAll: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        height: '100%',
        color: theme.palette.text.secondary,
        flexDirection: 'column',
      },
      subTitle: {
        color: theme.palette.error.dark,
        frontWeight: theme.typography.fontWeightBold,
        marginTop: '1rem',
      },
      btnAdd: {
        height: '40px',
        width: '40px',
        borderRadius: '20px',
        padding: '8px',
        marginTop: '1rem',
      },
      btnRemove: {
        height: '20px',
        width: '20px',
        borderRadius: '10px',
        padding: '5px',
        backgroundColor: theme.palette.grey[400],
        transform: 'translateY(98%)',
        marginLeft: '1rem',
      },
      characters: {
        color: theme.palette.text.secondary,
        frontWeight: theme.typography.fontWeightBold,
      },
      textBtnAdd: {
        display: 'inline-block',
        transform: 'translateY(50%)',
        marginLeft: '8px',
      },
      colorCheckbox: {
        color: theme.palette.error.dark,
      },
      translateY50: {
        transform: 'translate(0 , -50%)',
      },
      marginTop5: {
        marginTop: '5rem',
      },
      marginTop1: {
        marginTop: '1rem',
      },
      colorRed: {
        color: theme.palette.error.dark,
      },
      textCenterVerticalLeft: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'start',
        verticalAlign: 'middle',
        height: '100%',
        color: theme.palette.error.dark,
        flexDirection: 'column',
        paddingBottom: '20px',
      },
      maxWidthGridReservation: {
        maxWidth: '266px',
      },
      maxWidthBusinessHour: {
        maxWidth: '400px',
      },
}))
export default useStyles;