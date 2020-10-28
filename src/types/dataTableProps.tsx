import { IHeaderType } from "./headerType";

export default interface IdataTablePropType {
      headers: IHeaderType[];
      body: any[];
      isPaging?: boolean;
      pageSize?: number;
      noOfIndexToBeShown?: number;
      enableDelete?: boolean;
      enableEdit?: boolean;
      enableInsert?: boolean;
      enableFilter?: boolean;
      rowSelectable?: boolean;
      onRowUpdate?: (row: any, action: string) => void;
      onRowSelect?: (row: any, index: number, selected: boolean) => void;
  }
  