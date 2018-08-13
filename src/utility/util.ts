class Util {
  public getPageCount = (dataSize: number, pageSize?: number): any[] => {
    return Array.from({ length: pageSize? Math.ceil(dataSize / pageSize): 0 }, (x, i) => i + 1);
  };

  public getFilteredData = (searchText: string, data: any[]): any[] => {
    if (searchText !== "") {
      return data.filter(item => {
        return this.filterLogic(item, searchText);
      });
    } else {
      return data;
    }
  };

  public dynamicSort = (property: string) => {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a: any,b: any) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  public doPaging = (pageNumber: number, dataset: any[], isPaging?: boolean, pageSize?: number): any[] => {
    if (isPaging && pageSize) {      
      return dataset.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
    }
    return dataset;
  }

  private filterLogic = (obj: any, textsearch: string): boolean => {
    let isFound: boolean = false;
    Object.keys(obj).forEach((key: any) => {
      if (obj[key].toString().toLowerCase().indexOf(textsearch.toLowerCase()) !== -1) {
        isFound = true;
      }
    });
    return isFound;
  };

  
}

export default new Util();