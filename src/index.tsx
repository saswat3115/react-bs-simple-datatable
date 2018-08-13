import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import DataTable from "./component/datatable";
import "./data-table.css";
import * as dataSource from './data.json';
import registerServiceWorker from "./registerServiceWorker";
import { IHeaderType, PropDataType } from "./types/headerType";

const editOptions = [ "USA", "IND", "AUS"];

const headers: IHeaderType[] = [
  { title: "Id", prop: "id", enableSort: true, noEdit: true },
  { title: "Name", prop: "name", enableSort: true },
  { title: "Address", prop: "add" },
  { title: "Age", prop: "age", enableSort: true},
  { title: "Country", prop: "country", enableSort: true,  type: PropDataType.MULTI_OPTION, optionsOnEdit: editOptions},
  { title: "Status", prop: "status", type: PropDataType.CHECKBOX }
];
const body: any[] = dataSource.default

const update = (updatedRow: any, action: string) => {
  window.console.log(updatedRow);
  window.console.log(action);
  // TODO: Do necessary action on this
};

ReactDOM.render(
  <DataTable
    headers={headers}
    body={body}
    isPaging
    pageSize={3}
    noOfIndexToBeShown={3}  
    enableDelete
    enableEdit
    enableInsert
    onRowUpdate={update}
    enableFilter
  />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
