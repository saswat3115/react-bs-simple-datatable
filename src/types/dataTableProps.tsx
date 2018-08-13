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
      onRowUpdate?(row: any, action: string): void;
  }
  