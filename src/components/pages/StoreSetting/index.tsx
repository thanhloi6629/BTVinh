import React, { useState } from 'react'
import {
    Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select,
  } from '@material-ui/core';
  import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles'; 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import momentUtils from '@date-io/moment';
import moment from 'moment';

import listArea from './sample'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IStoreSetting {
    neighborhoodOrgId: INeighboringOrganization[],
    areaId: string,
    startDate: string,
    endDate: string,
}


export interface INeighboringOrganization{
  orgId: string,
  orgName: string
};

const validateSchema = yup.object({
  neighborhoodOrgId: yup.array().of(
    yup.object().shape({
      orgId: yup.string(),
      orgName: yup.string(),
    })
  ),
  areaId: yup.string(),
  startDate: yup.string(),
  endDate: yup.string(),
})

const list = [
  {
      "orgId": "ALL",
      "orgName": "全選択"
  },
  {
      "orgId": "83e80dd5-ea80-45d3-af49-6b1a8392a643",
      "orgName": "Trangcomtor"
  },
  {
      "orgId": "30bb38e1-8222-4f85-a7eb-955003fad3e4",
      "orgName": "花火03"
  },
  {
      "orgId": "49f3c2fb-2fb8-4c1e-934f-df4bf4733867",
      "orgName": "花火06"
  },
  {
      "orgId": "9cb6594f-01d5-45ca-ab10-4ea9425e918a",
      "orgName": "long org"
  },
  {
      "orgId": "d3cfbb07-943d-47a6-b4e6-5f7ced27eb82",
      "orgName": "花火07"
  },
  {
      "orgId": "13f7c967-3dec-4169-939a-80007dfe5eef",
      "orgName": "花火08"
  },
  {
      "orgId": "24ee1bb4-bd9e-49d3-b27d-22e97cbf5199",
      "orgName": "LongOrg"
  }
]



const StoreSetting = () => {

  const classes = useStyles();
  const [listNeighboringOrganization, setListNeighboringOrganization] = useState<INeighboringOrganization[]>(list);


  const { handleSubmit, formState: { errors }, control, setValue, setError, reset, watch, getValues, clearErrors} = useForm<IStoreSetting>({
    resolver: yupResolver(validateSchema),
    defaultValues: {
        neighborhoodOrgId: [],
        areaId: '',
    }

})
  return (
    <Box>
      <Grid container={true}>

      <Grid item={true} container={true} lg={6} spacing={2}>
                <Grid item={true} xs={2} md={2} lg={5}>
                  <Box>
                    <FormControl variant="outlined" fullWidth={true}>
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field: {ref, ...rest}  }) => (
                          <MuiPickersUtilsProvider utils={momentUtils}>
                            <KeyboardDatePicker
                              {...rest}
                              inputRef={ref}
                              variant="inline"
                              inputVariant="outlined"
                              format="YYYY年MM月DD日"
                              disableToolbar={true}
                              autoOk={true}
                              onChange={(e) => {
                                rest.onChange(e?.format('YYYY-MM-DD') || 'Invalid date');
                                if (moment(getValues('endDate')).format('YYYY-MM-DD') !== 'Invalid date' && moment(getValues('endDate')).isSameOrAfter(moment(e))) {
                                  clearErrors(['endDate']);
                                }
                              }}
                              fullWidth={true}
                              error={!!errors?.startDate}
                              helperText={errors?.startDate?.message}
                              label="問い合わせ日"
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item={true}>
                  <Box className={classes.middleMark}>～</Box>
                </Grid>
                <Grid item={true} xs={2} md={2} lg={5}>
                  <Box>
                    <FormControl variant="outlined" fullWidth={true}>
                      <Controller
                        name="endDate"
                        control={control}
                        render={( {field : { ref, ...rest }}) => (
                          <MuiPickersUtilsProvider utils={momentUtils}>
                            <KeyboardDatePicker
                              {...rest}
                              inputRef={ref}
                              variant="inline"
                              inputVariant="outlined"
                              format="YYYY年MM月DD日"
                              disableToolbar={true}
                              autoOk={true}
                              onChange={(e) => {
                                rest.onChange(e?.format('YYYY-MM-DD') || 'Invalid date');
                                if (moment(getValues('startDate')).format('YYYY-MM-DD') !== 'Invalid date' && moment(getValues('startDate')).isSameOrBefore(moment(e))) {
                                  clearErrors(['startDate']);
                                }
                              }}
                              fullWidth={true}
                              error={!!errors?.endDate}
                              helperText={errors?.endDate?.message}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      />
                    </FormControl>
                  </Box>
                </Grid>

              </Grid>
        <Grid item={true} md={12} lg={12}>
          <Box marginTop={2} marginBottom={2}>
            <Typography className={classes.subTitle} variant="h6" align="left">
              近隣店舗
            </Typography>
          </Box>
        </Grid>
        <Grid item={true} lg={7} className={classes.marginTop1}>
          <FormControl variant="outlined" fullWidth={true}>
            <Controller
              name="neighborhoodOrgId"
              control={control}
              defaultValue={getValues('neighborhoodOrgId')}
              render={({ field: { onChange, ...rest}
              }) => (
                <Autocomplete
                  {...rest}
                  multiple={true}
                  limitTags={4}
                  options={listNeighboringOrganization}
                  defaultValue={listNeighboringOrganization}
                  disableCloseOnSelect={true}
                  noOptionsText="該当する適用店舗を見つかりません。"
                  getOptionLabel={(org) => org.orgName || ' '}
                  filterSelectedOptions={false}
                  onChange={(event, newValue, reason, detail) => {
                    const selectedArr = [...newValue];
                    let mergedArr: any[] = [];
                    switch (reason) {
                      case 'clear':
                        mergedArr = [];
                        break;
                      case 'remove-option': {
                        const deletedVal = detail?.option;
                        mergedArr = selectedArr.filter((item) => item.orgId !== deletedVal?.orgId);
                        break;
                      }
                      default:
                        if (detail?.option?.orgId === 'ALL') {
                          mergedArr = (getValues('neighborhoodOrgId')?.length === (listNeighboringOrganization?.length - 1)) ? [] : listNeighboringOrganization.filter((item) => item.orgId !== 'ALL');
                        } else {
                          mergedArr = selectedArr.filter((item) => item.orgId !== 'ALL');
                          break;
                        }
                    }
                    onChange(mergedArr);
                  }}
                  getOptionSelected={(option, value) => option.orgId === value.orgId}
                  renderOption={(option, state) => {
                    let isSelected = state.selected;
                    if (listNeighboringOrganization.length - 1 === getValues('neighborhoodOrgId').length) {
                      isSelected = true;
                    }
                    const arrSelected = getValues('neighborhoodOrgId')?.filter((item) => item.orgId !== 'ALL');
                    const arrOrgId = arrSelected.map((item) => item.orgId);
                    if (arrOrgId.includes(option.orgId)) {
                      isSelected = true;
                    }
                    return (
                      <>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={isSelected}
                        />
                        {String(option?.orgName || '').trim()}
                      </>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="近隣店舗"
                    />
                  )}
                    // hiện kiểu dấu phẩy

                  // renderTags={(value) => (
                  //   <span style={{
                  //     whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 2, maxWidth: '85%', position: 'absolute', color: '#606060',
                  //   }}
                  //   >
                  //     {value.map((option, index) => (option?.orgName || '')).join(', ')}
                  //   </span>
                  // )}
                />
              )}
            />
            {errors.neighborhoodOrgId && (<FormHelperText error={!!errors.neighborhoodOrgId}>{(errors.neighborhoodOrgId as any).message}</FormHelperText>)}
          </FormControl>
        </Grid>
      </Grid>

      <Grid item={true} xs={12} md={12} lg={4}>
        <Controller
          name="areaId"
          control={control}
          render={({ field: { ref, ...rest }}) => (
            <FormControl variant="outlined" fullWidth={true} margin="normal">
              <InputLabel shrink={true}>エリア</InputLabel>
              <Select
                {...rest}
                inputRef={ref}
                displayEmpty={true}
                input={(
                  <OutlinedInput
                    label="エリア"
                    classes={{
                      notchedOutline: classes.notchedOutline,
                    }}
                  />
                  )}
              >
                <MenuItem value="">--------</MenuItem>
                {listArea && listArea?.map((item: any) => <MenuItem key={String(item?.areaId)} value={item?.areaId}>{item?.areaName || ''}</MenuItem>)}
              </Select>
            </FormControl>
          )}
        />
        <FormHelperText error={!!errors?.areaId}>{errors?.areaId?.message || ''}</FormHelperText>
      </Grid>
    </Box>
  )
}

export default StoreSetting
