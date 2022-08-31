export interface IMstData {
    areaId: string;
    areaName: string;
    dispOrder: string;
    effective: boolean;
  }

export interface IAreaMst {
    totalPage: number;
    totalItem: number;
    currentPage: number;
    contents: IContent[];
}

export interface IContent {
    updateDate: null | string;
    updateUser: null | string;
    createDate: null | string;
    createUser: null | string;
    areaId: string;
    companyCode: string;
    areaName: string;
    dispOrder: number;
    effective: boolean;
}

export interface IAreaMstValidation {
    areaId: string;
    areaName: string;
    dispOrder: string;
    effective: string;
}

export interface IRequestSearchAreaMst {
    effectiveType: string,
    page?: number,
    size?: number,
}

export interface IParamsSearch extends IRequestSearchAreaMst {
    totalItem?: number,
}
