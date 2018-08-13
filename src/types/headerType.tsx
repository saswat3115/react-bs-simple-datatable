export interface IHeaderType {
    title: string;
    prop: string;
    enableSort?: boolean;
    type?: PropDataType;
    optionsOnEdit?: any;
    noEdit?: boolean;
}

export enum PropDataType {
    TEXT, MULTI_OPTION, CHECKBOX
}
