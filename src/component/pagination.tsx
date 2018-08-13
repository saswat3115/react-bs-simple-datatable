import * as React from "react";

export default class Pagination extends React.Component<any, any> {
  constructor(props: any) {    
    super(props);
    window.console.log(this.props.pageCount);
    this.state = {
      currentIndexes: this.getSlice(this.props.pageCount, this.props.noOfIndexToBeShown)      
    };
  }

  public getSlice = (pageCount: any[], noOfIndexToSHow: number) => {
    const noOfIndex = noOfIndexToSHow || 3;
    if(pageCount.length > noOfIndex) {
      return pageCount.slice(0,noOfIndex);
    } else {
      return pageCount;
    }
  }



  public componentWillReceiveProps(newProps: any) {
    if(this.props.pageCount !== newProps.pageCount) {
      this.setState({
        currentIndexes: this.getSlice(newProps.pageCount, newProps.noOfIndexToBeShown)
      });
    }    
  }

  public onPageClick = (index: number) => {
    this.props.onPageClick(index);
  }

  public onPrevClick = () => {
    const firstIndex = this.state.currentIndexes[0];
    if(firstIndex > 1) {
      const modifiedIndex = this.state.currentIndexes;
      modifiedIndex.pop();
      modifiedIndex.unshift(firstIndex-1);
      this.setState({
        currentIndexes: modifiedIndex
      });
    }
  }

  public onNextClick = () => {
    const lastIndex = this.state.currentIndexes[this.state.currentIndexes.length - 1];
    if(this.props.pageCount.length > lastIndex) {
      const modifiedIndex = this.state.currentIndexes;
      modifiedIndex.shift();
      modifiedIndex.push(lastIndex + 1);
      this.setState({
        currentIndexes: modifiedIndex
      });
    }
  } 


  public render() {
    const prevClass =
      this.state.currentIndexes[0] === 1 ? "page-item disabled" : "page-item";
    const nextClass =
      this.state.currentIndexes[this.state.currentIndexes.length - 1]
       === this.props.pageCount.length ? "page-item disabled" : "page-item";
    const activePage = (index: number) => this.props.currentPage === index ? 
      "page-item active": "page-item";

    const indexes = this.state.currentIndexes.map((index: number) => {
      return (
        <li className={activePage(index)} key={index}>
          <a
            className="page-link"
            href="#"
            onClick={this.onPageClick.bind(this, index)}
          >
            {index}
          </a>
        </li> 
      );
    });  

    return (
      <nav aria-label="...">
        <ul className="pagination">
          <li className={prevClass}>
            <a className="page-link" href="#" onClick={this.onPrevClick}>
              prev
            </a>
          </li>
          {indexes}
          <li className={nextClass}>
            <a className="page-link" href="#" onClick={this.onNextClick}>
              next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
