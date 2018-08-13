import * as React from "react";
import IdataTablePropType from "../types/dataTableProps";
import Util from "./../utility/util";
import EditField from "./editField";
import Pagination from "./pagination";
import PopupModal from "./popupModal";

export default class DataTable extends React.Component<
  IdataTablePropType,
  any
> {

  constructor(props: IdataTablePropType) {
    super(props);

    this.state = {
      columnIndex: null,
      currentPage: 1,
      isCellClicked: false,
      rowIndex: null,      
      editingData: {},
      body: Util.doPaging(
        1,
        this.props.body,
        this.props.isPaging,
        this.props.pageSize
      ),
      headers: this.props.headers,
      isAscending: false,
      pageCount: Util.getPageCount(this.props.body.length, this.props.pageSize),
      filteredBody: [],
      deleteIndex: undefined
    };
  }

  

  public onTextChange = (updatedValue: any, name: any) => {
    const obj = this.state.editingData;
    obj[name] = updatedValue;
    this.setState({
      editingData: obj
    });
  };

  public onEditClick = (index: any, e: any): void => {
    const buttonText = e.target.innerText;
    this.setState(
      {
        isCellClicked:
          index !== this.state.rowIndex ? true : !this.state.isCellClicked
      },
      () => {
        this.doAction(buttonText, index);
      }
    );
  };

  public doAction = (action: string, index: number) => {
    if (this.props.onRowUpdate) {
      if (action === "edit") {
        this.setState({
          editingData: this.state.body[index],
          rowIndex: index
        });
      } else if (action === "save") {
        this.props.onRowUpdate(this.state.editingData, "update");
      }
    }
  };

  public onFilterTextChange = (e: any) => {
    const query: string = e.target.value;
    const filterData = Util.getFilteredData(query, this.props.body);
    this.setState(
      {
        body: Util.doPaging(
          1,
          filterData,
          this.props.isPaging,
          this.props.pageSize
        ),
        filteredBody: query === "" ? [] : filterData
      },
      () => {
        this.setState({
          currentPage: 1,
          pageCount:
            query === ""
              ? Util.getPageCount(this.props.body.length, this.props.pageSize)
              : Util.getPageCount(
                  this.state.filteredBody.length,
                  this.props.pageSize
                )
        });
      }
    );
  };

  public onDeleteClick = (index: any): void => {
    this.setState({
      deleteIndex: index
    });
  };

  public onDeleteConfirmClick = (e: any) => {
    const ubody = this.state.body;
    ubody.splice(this.state.deleteIndex, 1);
    this.setState({
      body: ubody,
      deleteIndex: undefined
    });
    if (this.props.enableDelete && this.props.onRowUpdate) {
      this.props.onRowUpdate(this.state.body[this.state.deleteIndex], "delete");
    }
  };

  public onSortClick = (index: any, e: any) => {
    let sortProperty = this.state.headers[index].prop;
    sortProperty = this.state.isAscending ? sortProperty : "-" + sortProperty; // making sort direction
    this.setState(
      {
        columnIndex: index,
        isAscending: !this.state.isAscending
      },
      () => {
        this.setState({
          body: Util.doPaging(
            1,
            this.state.filteredBody.length
              ? this.state.filteredBody.sort(Util.dynamicSort(sortProperty))
              : this.props.body.sort(Util.dynamicSort(sortProperty)),
            this.props.isPaging,
            this.props.pageSize
          ),
          currentPage: 1
        });
      }
    );
  };

  public onPageIndexClick = (index: number): void => {
    const data =
      this.state.filteredBody.length === 0
        ? this.props.body
        : this.state.filteredBody;

    this.setState({
      body: Util.doPaging(
        index,
        data,
        this.props.isPaging,
        this.props.pageSize
      ),
      currentPage: index,
      isCellClicked: false
    });
  };

  public render() {
    const actionEnable = this.props.enableDelete || this.props.enableEdit;
    const headerLenght = actionEnable
      ? this.state.headers.length + 1
      : this.state.headers.length;
    return (
      <div id="dtTable">
              <div className="input-group md-form form-sm form-2 pl-0 div-search">
                <input 
                  className="form-control my-0 mt-sm py-1 red-border"
                  type="text" 
                  placeholder="Search"
                  aria-label="Search"
                  hidden={!this.props.enableFilter}
                        onChange={this.onFilterTextChange} />
                <div className="input-group-append">
                    <span className="input-group-text red lighten-3" id="basic-text1">
                      <i className="fa fa-search text-grey" aria-hidden="true" />                      
                    </span>
                </div>
            </div>       
        <table className="table table-hover">
          <thead className="thead-dark table-bordered">
            <tr>
              {this.state.headers.map((item: any, index: number) => {
                return (
                  <th key={index} scope="col">
                    {item.title}
                    {item.enableSort ? (
                      <div className="sort-keys">
                        <i
                          aria-hidden="true"
                          onClick={this.onSortClick.bind(this, index)}
                          className={
                            this.state.columnIndex === index &&
                            this.state.isAscending                              
                              ? "sort up"
                              : "sort down"
                          }
                        />
                      </div>
                    ) : null}
                  </th>
                );
              })}
              {actionEnable ? <th className="th-action" /> : null}
            </tr>
          </thead>
          <tbody className="table-bordered">
            {this.state.body.length ? (
              this.state.body.map((item: any, index: number) => {
                return (
                  <tr className="tr-item-list" key={index}>
                    {this.state.headers.map((col: any, colIndex: number) => {
                      return (
                        <td key={index + "" + colIndex}>
                          {this.state.isCellClicked &&
                          this.state.rowIndex === index &&
                          !col.noEdit ? (                            
                            <EditField
                              val={item[col.prop]}
                              name={col.prop}
                              type={col.type}
                              onUpdate={this.onTextChange}
                              editOptions={col.optionsOnEdit}
                            />
                          ) : (
                            item[col.prop].toString()
                          )}
                        </td>
                      );
                    })}
                    {actionEnable ? (
                      <td>
                        {this.props.enableEdit ? (
                          <button
                            className="btn btn-info btn-sm"
                            onClick={this.onEditClick.bind(this, index)}
                          >
                            {this.state.isCellClicked &&
                            this.state.rowIndex === index
                              ? "save"
                              : "edit"}
                          </button>
                        ) : null}
                        &nbsp;
                        {this.props.enableDelete ? (
                          <button
                            className="btn btn-danger btn-sm"
                            data-toggle="modal"
                            data-target="#deleteModal"
                            data-index-id={index}
                            onClick={this.onDeleteClick.bind(this, index)}
                          >
                            delete
                          </button>
                        ) : null}
                      </td>
                    ) : null}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={headerLenght}>No items available !</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={headerLenght - (this.props.enableInsert? 1: 0)}>
                {this.props.isPaging ? (
                  <Pagination
                    pageCount={this.state.pageCount}
                    currentPage={this.state.currentPage}
                    noOfIndexToBeShown={this.props.noOfIndexToBeShown}
                    onPageClick={this.onPageIndexClick}
                  />
                ) : null}
              </td>
              {this.props.enableInsert? 
              <td>
                <button className="btn btn-primary btn-sm">
                  Add New 
                </button>
              </td>: null}
            </tr>
          </tfoot>
        </table>
        <PopupModal title="Confirm Delete" id="deleteModal">
          Are you sure want to delete ? &nbsp; &nbsp;
          <button
            className="btn btn-primary btn-sm"
            onClick={this.onDeleteConfirmClick}
            data-dismiss="modal"
          >
            Yes
          </button>{" "}
          &nbsp;
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-dismiss="modal"
          >
            No
          </button>
        </PopupModal>
      </div>
    );
  }
}
