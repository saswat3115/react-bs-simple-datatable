## React-bs-simple-datatable

A react component data-table librabry.

## Table of Contents

- [How to Use](#how-to-use)
- [Configuration](#datatable-configuration)
  - [data table headers](#datatable-header-configuration)
  - [header types](#header-types)
  - [sorting](#sorting)
  - [paging](#paging)
  - [filter](#filter)
  - [edit](#edit)


## How to Use

```
<DataTable
    headers={headers}
    body={body}
    isPaging
    pageSize={3}
    noOfIndexToBeShown={3}  
    enableDelete
    enableEdit    
    onRowUpdate={update}
    enableFilter
  />
```

## Datatable Header Configuration

- Specify header type as __*IHeaderType[]*__. 
- __*title*__ is what to show in data table header
- __*prop*__ is property name of data source
- __*enableSort*__ to enabe sorting to specific column
- __*noEdit*__ to restrict editing the specific column
- __*type*__ is data type of property
- __*optionsOnEdit*__ provides multiple option while on edit mode (provide only when the field is a dropdown)

Following code is a header sample
```
var headers: IHeaderType[] = [
  { title: "Id", prop: "id", enableSort: true, noEdit: true },
  { title: "Name", prop: "name", enableSort: true },
  { title: "Address", prop: "add" },
  { title: "Age", prop: "age", enableSort: true},
  { title: "Country", prop: "country", enableSort: true,  type: PropDataType.MULTI_OPTION, optionsOnEdit: sampleOptions},
  { title: "Status", prop: "status", type: PropDataType.CHECKBOX }
];

var sampleOptions = [ "USA", "IND", "AUS"];
```

## Header Types

Header type as follows
```
interface IHeaderType {
    title: string;
    prop: string;
    enableSort?: boolean;
    type?: PropDataType;
    optionsOnEdit?: any;
    noEdit?: boolean;
}
```

Property types as follows
```
enum PropDataType {
    TEXT, MULTI_OPTION, CHECKBOX
}

```

## Sorting

`enableSort: true` in header configuration to enable sorting 



