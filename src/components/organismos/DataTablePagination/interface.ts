export type itemSelectType = {
    checked: boolean;
    value: string;
}
export interface HeadCell {
    id: string,
    label: string;
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
}

export interface DataTableColumn extends HeadCell {
    content: (row: any, index: number, order: number) => React.ReactElement,
    width?: string
    alignCenterTitle?: boolean
}

export interface DataTableProps {
    // TableHeadCustom?: () => JSX.Element | undefined;
    // isShowTableHeadCustom?: boolean,
    data: any[];
    handleChangeSize: (size: number) => Promise<void>;
    handleChangePage: (page: number) => Promise<void>;
    columns: DataTableColumn[];
    onItemSelect?: (item:itemSelectType) => void;
    onItemSelectAll?: (checked: boolean) => void;
    // onItemDelete?: () => void;
    selectedRows?: string[];
    // showDeleteAndCheckBoxIcon?: boolean;
    nonDataText?: string;
    rowsPerPageOptions?: number[],
    // isSelectedRowCheckBox?: boolean,
    labelGetIdForCheckIcon?: string,
    // isSelectedOnlyRowCheckBox?: boolean,
    // showPagination?: boolean,
    showTablePagination?: boolean,
    // showSelectedAll?: boolean,
    // isSelectedOnlyCheckBox?: boolean,
    isShowCheckBoxIcon?: boolean
    // isCustomerTable?: boolean,
    isSticky?: boolean,
    // haveBorderRight?: boolean,
    // haveBorderRightWithDeleteCheckbox?: boolean,
    // isTableLogoSetting?: boolean,
    // widthTable?: string,
    // rowColor?: string,
    // hasBorderNotForCheckBox?: boolean,
    // hidePaginationBox?: boolean,
    size?: number,
    page: number,
    totalItem?: number,
    isCheckedAll?: boolean,
  }
