import {useState} from 'react';
import Fade from '@material-ui/core/Fade';
import { Box, Button, Dialog, DialogContentText, FormControl, Grid, InputLabel, Menu, MenuItem, OutlinedInput, Select } from '@material-ui/core'
import PillButton from 'components/atoms/Buttons/PillButton'
import React from 'react'
import useStyles from './styles';
import RoundedDeleteButton from 'components/atoms/Buttons/Round/RoundedDeleteButton';
import { Controller, useForm } from 'react-hook-form';
import DialogTitleCustom from 'components/atoms/Modal/DialogTitleCustom';

function Test() {
    // 
    const classes = useStyles();
    const initialState = { mouseX: null, mouseY: null };
    const [menuState, setMenuState] = useState<{ mouseX: null | number; mouseY: null | number}>(initialState);
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
      };

    const handleClickOpenDialog = () => {
    setOpenDialog(true);
    setMenuState({
        mouseX: 800,
        mouseY: 200,
    });
    };

    const onHandleClick = () => {
        console.log("vo day");
        handleClickOpenDialog();
    }
    
      const handleCloseModal = () => {
        setOpenDialog(false);
      };
    const {control} = useForm({ mode: 'onChange'});

    const listReason = [
        {
            "updateDate": "2022-08-10T17:37:59.000+0900",
            "updateUser": "tester 1",
            "createDate": "2022-08-10T17:37:59.000+0900",
            "createUser": "tester 1",
            "cancelReasonId": "fa653137-eb64-4938-bd30-f39ad5d7c2d3",
            "companyCode": "CP01",
            "reason": "reason 1"
        },
        {
            "updateDate": "2022-08-10T17:37:59.000+0900",
            "updateUser": "tester 2",
            "createDate": "2022-08-10T17:37:59.000+0900",
            "createUser": "tester 2",
            "cancelReasonId": "25ca7830-3d94-4a74-a570-e051d8563c1d",
            "companyCode": "CP01",
            "reason": "reason 2"
        },
        {
            "updateDate": "2022-08-10T17:37:59.000+0900",
            "updateUser": "tester 3",
            "createDate": "2022-08-10T17:37:59.000+0900",
            "createUser": "tester 3",
            "cancelReasonId": "f2ca8c71-76a3-48c4-a885-8b7371ad91aa",
            "companyCode": "CP01",
            "reason": "reason 3"
        },
        {
            "updateDate": "2022-08-10T17:37:59.000+0900",
            "updateUser": "tester 4",
            "createDate": "2022-08-10T17:37:59.000+0900",
            "createUser": "tester 4",
            "cancelReasonId": "3f9fc199-f7f9-4ff0-a215-776e8e5b2220",
            "companyCode": "CP01",
            "reason": "reason 4"
        },
        {
            "updateDate": "2022-08-10T17:37:59.000+0900",
            "updateUser": "tester 5",
            "createDate": "2022-08-10T17:37:59.000+0900",
            "createUser": "tester 5",
            "cancelReasonId": "6120e65e-56ac-4094-a060-283c9fbfe639",
            "companyCode": "CP01",
            "reason": "reason 5"
        }
    ]

    const handleReasonUpdate = () => {

    }
    
  return (
    <div>
       <PillButton
        color="primary"
        variant="contained"
        style={{ width: '220px' }}
        onClick = {() => onHandleClick()}
        
      >
        <strong>予約一覧</strong>
      </PillButton>

        {/* Modal cách 1 */}
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ overflowY: 'unset' }}
            className={classes.dialog}
        >
              <DialogTitleCustom onClose={handleCloseModal}>予約問い合わせキャンセル確認</DialogTitleCustom>
              <DialogContentText>
                <Box className={classes.dialogContentText}>
                  <Box>選択された予約問い合わせ情報をキャンセルしますか？</Box>
                  <Box>キャンセル理由を選択してから、「はい」ボタンをクリックしてください</Box>
                </Box>
                <Grid xs={8} md={6} lg={3} item={true} className={classes.dialogContentSelect}>
                  <Controller
                    name="cancelReasonId"
                    control={control}
                    render={({ field: {ref, ...rest} }) => (
                      <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel shrink={true}>キャンセル理由</InputLabel>
                        <Select
                          {...rest}
                          inputRef={ref}
                          label="キャンセル理由"
                          displayEmpty={true}
                          defaultValue=""
                          input={(
                            <OutlinedInput
                              label="キャンセル理由"
                              classes={{
                                notchedOutline: classes.notchedOutline,
                              }}
                            />
                      )}
                        >
                          {
                        [
                          <MenuItem
                            key={1}
                            aria-label="None"
                            value=""
                          >
                            ---------
                          </MenuItem>,
                          listReason?.length && listReason?.map((item, i) => (
                            <MenuItem
                              key={item.cancelReasonId + String(i)}
                              value={item.cancelReasonId}
                            >
                              {item.reason}
                            </MenuItem>
                          )),
                        ]
                      }
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </DialogContentText>
              <Box className={classes.button}>
                <PillButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth={true}
                  onClick={handleReasonUpdate}
                  className={classes.dialogButtonOK}
                >
                  <strong>はい</strong>
                </PillButton>

                <Button
                  onClick={handleCloseDialog}
                  color="primary"
                  autoFocus={true}
                  className={classes.dialogButtonCancel}
                >
                  いいえ
                </Button>
              </Box>
        </Dialog>



        {/* cách 2 */}
        {/* <Menu
              classes={{
                paper: classes.overflowVisible,
                list: classes.nonePadding,
              }}
              className={classes.popupModal}
              keepMounted={true}
              open={openDialog}
              onClose={handleCloseDialog}
              anchorReference="anchorPosition"
              TransitionComponent={Fade}
              anchorPosition={
              menuState.mouseY !== null && menuState.mouseX !== null
                ? { top: menuState.mouseY + 170, left: menuState.mouseX + 50 }
                : undefined
            }
            >
              <RoundedDeleteButton className={classes.closeMenuButton} onClick={handleCloseModal} />
              <MenuItem>
                <Box className={classes.dialogTitle}>予約問い合わせキャンセル確認</Box>

                <DialogContentText>
                  <Box className={classes.dialogContent}>
                    <Box>選択された予約問い合わせ情報をキャンセルしますか？</Box>
                    <Box>キャンセル理由を選択してから、「はい」ボタンをクリックしてください</Box>
                  </Box>
                  <Grid xs={8} md={6} lg={2} item={true} className={classes.dialogSelect}>
                    <Controller
                      name="cancelReasonId"
                      control={control}
                      render={({ field :{ref, ...rest} }) => (
                        <FormControl variant="outlined" fullWidth={true}>
                          <InputLabel shrink={true}>キャンセル理由</InputLabel>
                          <Select
                            {...rest}
                            inputRef={ref}
                            label="キャンセル理由"
                            displayEmpty={true}
                            defaultValue=""
                            input={(
                              <OutlinedInput
                                label="キャンセル理由"
                                classes={{
                                  notchedOutline: classes.notchedOutline,
                                }}
                              />
                      )}
                          >
                            {
                        [
                          <MenuItem
                            key={1}
                            aria-label="None"
                            value=""
                          >
                            ---------
                          </MenuItem>,
                          listReason?.length && listReason?.map((item, i) => (
                            <MenuItem
                              key={item.cancelReasonId + String(i)}
                              value={item.cancelReasonId}
                            >
                              {item.reason}
                            </MenuItem>
                          )),
                        ]
                      }
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </DialogContentText>
                <Box className={classes.button}>
                  <PillButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth={true}
                    onClick={handleReasonUpdate}
                    className={classes.dialogButtonOK}
                  >
                    <strong>はい</strong>
                  </PillButton>

                  <Button
                    onClick={handleCloseDialog}
                    color="primary"
                    autoFocus={true}
                    className={classes.dialogButtonCancel}
                  >
                    いいえ
                  </Button>
                </Box>
              </MenuItem>
        </Menu> */}
      
    </div>
  )
}

export default Test
