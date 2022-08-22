import { ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const RoundedDeleteButton = withStyles(({ palette }) => ({
  root: {
    height: '56px',
    width: '56px',
    borderRadius: '50%',
    // boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.1), 0px 1px 18px rgba(0, 0, 0, 0.1)',
    background: palette.primary.main,
    transition: 'opacity 0.2s linear',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '14px',
      height: '2px',
      background: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '2px',
      height: '14px',
      background: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    '&:hover': {
      opacity: 0.6,
    },
  },
}))(ButtonBase);
export default RoundedDeleteButton;
