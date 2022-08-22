import { DialogTitle, IconButton, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


import {
    createStyles, Theme, withStyles, WithStyles,
  } from '@material-ui/core/styles';
import React from "react";


const styles = (theme: Theme) => createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      backgroundColor: '#D0111B',
      color: '#ffffff',
      '&.MuiIconButton-root:hover': {
        backgroundColor: '#D0111B',
        color: '#ffffff',
        opacity: 0.6,
      },
    },
    title: {
      margin: 0,
      color: '#D0111B',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
  });
  
  interface DialogTitleProps extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    onClose: () => void;
  }
  const DialogTitleCustom = withStyles(styles)((props: DialogTitleProps) => {
    const {
      children, classes, onClose, ...other
    } = props;
    return (
      <div>
        <DialogTitle {...other}>
          <Typography className={classes.title}>
            {children}
          </Typography>
  
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      </div>
  
    );
  });

  export default DialogTitleCustom;
  