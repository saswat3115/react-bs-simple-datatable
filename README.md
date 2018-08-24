## React-bs-simple-datatable

A react component data-table librabry.

![data-table](/datatable.png)

## Table of Contents

- [How to Use](#how-to-use)
- [Configuration](#datatable-configuration)
  - [data table headers](#datatable-header-configuration)
  - [header types](#header-types)
  - [sorting](#sorting)
  - [paging](#paging)
  - [filter](#filter)
  - [edit](#edit)
  - [Handling edit/delete record](#handle-edit-delete-data)


## How to Use

```javascript
<DataTable
    headers={headers}
    body={bodyAsJSONArray}
    isPaging
    pageSize={3}
    noOfIndexToBeShown={3}  
    enableDelete
    enableEdit    
    onRowUpdate={methodToHandleEditingRecord}
    enableFilter
  />
```

## Datatable Header Configuration

- Specify header type as __*IHeaderType[]*__. 
- __`title`__ is what to show in data table header
- __`prop`__ is property name of data source
- __`enableSort`__ to enabe sorting to specific column
- __`noEdit`__ to restrict editing the specific column
- __`type`__ is data type of property
- __`optionsOnEdit`__ provides multiple option while on edit mode (provide only when the field is a dropdown)

Following code is a header sample. Pass this headers object to headers props of DataTable component
```javascript
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
```javascript
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
```javascript
enum PropDataType {
    TEXT, MULTI_OPTION, CHECKBOX
}

```

## Sorting

`enableSort: true` in header configuration to enable sorting 

## Paging
- Provide `isPaging` to enable pagination
- Provide `pageSize={noOfRecordsPerPage}` to show specific number of records per page
- Provide `noOfIndexToBeShown={3}` to show number of page indexes in paging div

`<DataTable isPaging pageSize={3} noOfIndexToBeShown={3} />`

![paging snapshot](/paging-snapshot.png)

## Filter
Provide `eneableFilter` props to enable filter operation in datatable
__NOTE:__ *By default filter is wild card search from every column*

`<DataTable enableFilter />`

![fliter snapshot](/filter-snapshot.png)

## Edit
Provide `enableEdit` props to enable edit button in data table
`<DataTable enableEdit />`

![edit snapshot](/edit-snapshot.png)
![edit snapshot on click](/edit-snapshot-on-click.png)

## Handle Edit Delete Data

Add a event handler to handle modified record. 
__NOTE:__ DataTable component temporarily updates the record in memory and emits the modifed record for you.
Pass your method to handle that object as shown below. This will work in both update and delete operation

```javascript
<DataTable
    onRowUpdate={methodToHandleEditingRecord}
  />

function methodToHandleEditingRecord(record) {
    // record object holds the selected edited record from data source
    // update to database
}
  
```
