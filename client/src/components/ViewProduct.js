import React, { Component } from "react";
import {
  Table,
  Button,
  Input,
} from "reactstrap";

class ViewProduct extends Component {
  // Can Add Constructor
  constructor(props) {
    super(props);
    this.state = {
      product: [{description: "awae", duration:"3", selectedOption:"Year", date: "12/02/1999"},{description: "awae", duration:"3", selectedOption:"Year", date: "12/02/1999"} ],
      productDate: "",
      Done: [],
      Update:[],
    };
  }
  submittdone = () => {
    this.props.done(this.state.Done);
  };
  remove = (d) => {
    this.setState(
      (state) => {
        const product = state.product.filter((item, j) => d !== j);
        return {
          product,
        };
      }, ()=> this.submittdone()
    );
  };
  submittupdate = () => {
    this.props.update(this.state.Update);
  };
  snoozefunc=(d,index)=>{
    this.remove(index)
    this.setState(state => {

      const Update = state.Update.concat(d);
      return {
          Update,
        };
      }, this.submittupdate()
  );
  }
  donefunc = (d,index)=>{
   this.remove(index)
    this.setState(state => {

      const Done = state.Done.concat(d);
      return {
          Done,}
  }
  );
  }
  displayupdate = () => {
    const addedproducts = this.state.Update.map((d, index) =>
      <tr style={{textAlign: "center"}}>
        <td>{d.description}</td>
        <td>{d.date}</td>
      </tr>
    );
    const addedDone = this.state.Done.map((d, index) =>
      <tr style={{textAlign: "center"}}>
        <td>{d.description}</td>
        <td>{d.quantity}</td>
      </tr>
    );

    return (
      <Table responsive>
        <tbody>
          {addedproducts}
          {addedDone}
        </tbody>
      </Table>
    );
  }
  valueChange = (d,index,e) =>{
    const update = {
        ...d,
        [e.target.id]: e.target.value
    }
    this.setState((state, props) => {
        return {
            product: [
                ...(state.product.slice(0, index)),
                update,
                ...(state.product.slice(index + 1))
            ]
        }
    })
  }
  display() {
    console.log(this.state.product)
    console.log(this.state.Update, "d")
    return this.state.product.map((d, index) => {
      var val = ""
      return (
      <div>
        {this.displayupdate()}  
        <tr style={{textAlign: "center"}}>
        <td>{d.description}</td>
        <td>{d.date}</td>
      </tr>    

          <div className="pl-1 pr-1 col-sm-4">
            <Input
              className="input-field-ad"
              type="date"
              placeholder="Enter Start Date"
              value= {d.Value}
              onChange = {(e) => this.valueChange(d,index,e)}
              id="date"
            />
          </div>
          <div className="mt-3 col-sm-12">
            <Button onClick={() =>this.snoozefunc(d,index)} style={{
              width: "25%",
              height: "40px",
              backgroundColor: "#4caf50",
              borderRadius: "20px",
              float: "right",
            }}>Snooze</Button>
          </div>
          <div className="pl-1 pr-1 col-sm-4">
            <Input
              className="input-field-ad"
              type="text"
              placeholder="Enter Start Date"
              value= {d.quantity}
              onChange = {(e) => this.valueChange(d,index,e)}
              id="quantity"
            />
          </div>
          <div className="mt-3 col-sm-12">
          <Button onClick={()=>this.donefunc(d,index)} style={{
            width: "20%",
            height: "40px",
            backgroundColor: "#4caf50",
            borderRadius: "20px",
            float: "right",
          }}>Done</Button>
          </div>
        </div>
      );
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.display()}
      </div>
    );
  }
}

export default ViewProduct;

