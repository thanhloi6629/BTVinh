import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  middleMark: {
    color: '#757575',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    marginTop: '15px',
  },
  notchedOutline: {
    // NOTE: the legend element is a child of the notchedOutline component
    '& legend': {
      maxWidth: '100%',
    },
  },
  dropdownWidth: {
    maxWidth: 250,
    marginRight: 20,
  },
  dialog: {
    '& .MuiDialog-paper': {
      overflowY: 'unset',
    },
  },
  dialogTitle: {
    margin: 0,
    color: '#D0111B',
    fontWeight: 'bold',
    lineHeight: '24px',
    paddingTop: '12px',
    paddingBottom: '24px',
    fontSize: 14,
  },
  dialogContent: {
    fontFamily: 'Roboto',
    letterSpacing: '0.15px',
    fontWeight: 400,
    fontSize: 12,
    // padding: '14px 24px',
    color: '#000000',
    '&.MuiTypography-root': {
      fontSize: 12,
    },
  },
  dialogContentText: {
    fontFamily: 'Roboto',
    letterSpacing: '0.15px',
    fontWeight: 400,
    fontSize: 12,
    padding: '14px 17px',
    color: '#000000',
    '&.MuiTypography-root': {
      fontSize: 12,
    },
  },
  dialogSelect: {
    maxWidth: 300,
    padding: '30px 24px 12px 0',
  },

  dialogContentSelect: {
    maxWidth: 300,
    padding: '30px 24px 0 17px',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto',
  },
  dialogButtonCancel: {
    marginLeft: '12px',
    background: '#948A8A',
    borderRadius: 25,
    width: 130,
    fontSize: 15,
    color: '#ffffff',
    '&.MuiButton-root:hover': {
      backgroundColor: '#948A8A',
      color: '#ffffff',
      opacity: 0.6,
    },
    '&.MuiButton-text': {
      padding: 14,
    },
  },
  dialogButtonOK: {
    marginRight: '12px',
    width: 130,
    background: '#D0111B',
    borderRadius: 25,
    color: '#ffffff',
    fontSize: 15,
    '&.MuiButton-root:hover': {
      backgroundColor: '#D0111B',
      color: '#ffffff',
      opacity: 0.6,
    },
    '&.MuiButton-text': {
      padding: 14,
    },
  },
  popupModal: {
    maxWidth: '500px',
  },
  closeMenuButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(15px, -15px)',
    zIndex: 1,
    width: '40px',
    height: '40px',
  },
  overflowVisible: {
    overflow: 'visible',
    minWidth: '400px',
    borderRadius: '4px',
    '& .MuiMenuItem-root': {
      maxWidth: '500px',
    },
    boxShadow: '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
  },
  nonePadding: {
    padding: '0',
  },
}));

export default useStyles;
