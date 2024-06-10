export interface IInputTree {
    id: number;
    name: string;
    level: number;
    parentId: number | null;
    itemType: number;
    divisionType: number;
    isActive: boolean;
    createdDate: string;
    modifiedDate: string;
    createdUserId: string;
    modifiedUserId: string;
  }