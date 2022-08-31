import React, { useEffect, useState } from 'react'
import {
    IAreaMst, IAreaMstValidation, IContent, IMstData, IParamsSearch, IRequestSearchAreaMst,
  } from './type';
import listMst from './sample';
import DataTablePagination from 'components/organismos/DataTablePagination/DataTablePagination';
import { TableCell } from '@material-ui/core';
import { DataTableColumn, itemSelectType } from 'components/organismos/DataTablePagination/interface';
import EditIcon from '@material-ui/icons/Edit';
import handleError from 'utility/handleError';
// import { useSnackbar } from 'notistack';
import useQuery from 'hooks/useQuery';


const AreaMst = () => {
    // const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
    const [list, setList] = useState<IContent[]>([]);

  const columns: DataTableColumn[] = [
    {
      id: 'dispOrder',
      align: 'left',
      label: '表示順',
      width: '100px',
      content(row: IMstData, index: number) {
        return (
          <TableCell
            key={index}
            align="center"
            component="th"
            id={`areaMst-${index}`}
            scope="row"
          >
            {row.dispOrder}
          </TableCell>
        );
      },
    },
    {
      id: 'areaName',
      align: 'left',
      label: 'エリア名',
      width: '250px',
      content(row: IMstData, index: number) {
        return (
          <TableCell
            key={index}
            align="left"
            component="th"
            id={`areaMst-${index}`}
            scope="row"
          >
            {row.areaName}
          </TableCell>
        );
      },
    },
    {
      id: 'effective',
      align: 'left',
      label: '状態',
      width: '70px',
      content(row: IMstData, index: number) {
        return (
          <TableCell
            key={index}
            align="left"
            component="th"
            id={`areaMst-${index}`}
            scope="row"
          >
            {row.effective === true ? '有効' : '無効'}
          </TableCell>
        );
      },
    },
    {
      id: 'action',
      align: 'right',
      label: '',
      width: '32px',
      content(row: IMstData, index: number) {
        return (
          <TableCell
            key={index}
            align="right"
            id={`areaMst-${index}`}
            onClick={() => {
            //   handleShowDetail(row.areaId);
            }}
          >
            <EditIcon color="disabled" style={{ cursor: 'pointer' }} />
          </TableCell>
        );
      },
    },

  ];

  const URLSearchParams = useQuery();
  // const pageInUrl = URLSearchParams.get('page') || 0;
  // const sizeInUrl = URLSearchParams.get('size') || 25;

  const defaultSearchForm: IRequestSearchAreaMst = {
    effectiveType: 'ALL',
    page:  0,
    size:  5,
  };

  const checkArrIncludeArr = (arrParent:any[], arrChild: string[]):boolean => (arrParent?.filter((item:any) => (arrChild?.includes(item?.applyDocId)))?.length === arrParent?.length);


  const handleChangeItemSelect = async(itemSelect: itemSelectType) =>{
    const {checked, value} = itemSelect;
    console.log("checked",checked );
    console.log("item",itemSelect );

    if (checked) {
      const newSelected = [...selectedRows, value];
      setSelectedRows([...selectedRows, value]);
      const isCheckAll = checkArrIncludeArr(list, newSelected);
      setIsSelectAll(isCheckAll);
    } else {
      const newSelected = selectedRows?.filter((item) => item !== value) || [];
      setSelectedRows(newSelected);
      setIsSelectAll(false);
    }


  }

  const handleChangeItemSelectAll = async(isChecked: boolean) =>{
    console.log('itemAll', isChecked);
    setIsSelectAll(isChecked);
    const approvalDocumentListId = list?.map((item:any) => item?.applyDocId) || [];
    if (isChecked) {
      const selectNew = approvalDocumentListId?.reduce((arr:string[], item:string) => {
        if (!selectedRows?.includes(item)) {
          return [...arr, item];
        }
        return arr;
      }, []);
      setSelectedRows([...selectedRows, ...selectNew]);
    } else {
      const selectNew = selectedRows?.filter((item:string) => (!approvalDocumentListId?.includes(item))) || [];
      setSelectedRows(selectNew);
    }
  }

  const fetchData = async (params:IRequestSearchAreaMst = defaultSearchForm) => {
    try {
      setLoading(true);
    //   await fetchAreaStatusData(params);

    setList(listMst.contents);
    } catch (error) {
      // handleError({ error, enqueueSnackbar });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div>
      <DataTablePagination 
        columns={columns} 
        data={list}
        isShowCheckBoxIcon={true}
        isCheckedAll={true}
        onItemSelect={(item) => handleChangeItemSelect(item)}
        onItemSelectAll={(checked) => handleChangeItemSelectAll(checked)}
        selectedRows={selectedRows}

        ></DataTablePagination>
    </div>
  )
}

export default AreaMst
