import * as React from "react";
import { PropDataType } from './../types/headerType';

export default class EditField extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
        value: this.props.val
    }
  }

  public onTextChange = (event: any): void => {    
    this.setState({
        value: event.target.value
    }, () => this.update())
  }

  public onCheckChange = (): void => {
      this.setState({
          value: !this.state.value
      }, () => this.update())
  }

  public onSelectChange = (e: any): void => {
      this.setState({
          value: e.target.value
      }, () => this.update())
  }

  public update = () => {
      this.props.onUpdate(this.state.value, this.props.name);
  }

  public render() {
    let field = null;
    switch(this.props.type) {
        case PropDataType.TEXT:
        field = <input
                    type="text" 
                    value={this.state.value}
                    onChange={this.onTextChange}
                    className="form-control"
                    name={this.props.name}
                />
                break;
        case PropDataType.CHECKBOX:   
        field = <input
                type="checkbox"
                checked={this.state.value}
                // value={this.props.val}                
                onChange={this.onCheckChange}
                className="form-control"
                name={this.props.name}
            />  
            break;
        case PropDataType.MULTI_OPTION: 
        field = <select           
                value={this.state.value}
                onChange={this.onSelectChange}
                className="form-control"
                name={this.props.name} > 
                    {/* <option>{this.state.value}</option> */}
                    {this.props.editOptions.map((i: any, index: any )=> {
                        return <option key={index}>{i}</option>
                    })}
                </select>
            
            break;
        default:
        field = <input
                    type="text"
                    value={this.state.value}
                    onChange={this.onTextChange}
                    className="form-control"
                    name={this.props.name}
                />          
    }
    

    return <div className="form-group">
                 {field}
           </div>;
  }
}
