import React, { Component } from "react";
import {
  Table,
  Button,
  Input,
} from "reactstrap";

class ViewAlert extends Component {
  // Can Add Constructor
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.Alerts,
      AlertDate: "",
      Done: [],
      Update:[]
    };
  }
  remove = (d) => {
    this.setState(
      (state) => {
        const data = state.data.filter((item, j) => d !== j);
        return {
          data,
        };
      }
    );
  };
  submitt = () => {
    this.props.update(this.state.data);
  };
  snooze=(d, index, val)=>{
    const update = {
      ...d,
      Value: val
  }
  this.setState((state, props) => {
      return {
          update: [
              ...(state.update.slice(0, index)),
              update,
              ...(state.update.slice(index + 1))
          ]
      }
  })
  }
  done = (d,index)=>{
    this.remove(index)
    this.setState(state => {

      const done = state.done.concat(d);
      return {
          done,
      };
  }
  );
  }
  display = () => {
    const addedAlerts = this.state.Update.map((d, index) =>
      <tr style={{textAlign: "center"}}>
        <td>{d.description}</td>
        <td>{d.duration}</td>
        <td>{d.selectedOption}</td>
        <td>{d.date}</td>
      </tr>
    );
    const addedDone = this.state.Done.map((d, index) =>
      <tr style={{textAlign: "center"}}>
        <td>{d.description}</td>
        <td>{d.duration}</td>
        <td>{d.selectedOption}</td>
        <td>{d.date}</td>
      </tr>
    );

    return (
      <Table responsive>
        <tbody>
          {addedAlerts}
          {addedDone}
        </tbody>
      </Table>
    );
  }
  display() {
    return this.state.data.map((d, index) => {
      var val = ""
      return (
      <div>
        {this.display()}
        <div>
          <td>{d.description}</td>
          <td>{d.duration}</td>
          <td>{d.selectedOption}</td>
          <td>{d.date}</td>
        </div>
          
          <div className="pl-1 pr-1 col-sm-4">
            <Input
              className="input-field-ad"
              type="date"
              placeholder="Enter Start Date"
              value={val}
              id="AlertDate"
            />
          </div>
          <div className="mt-3 col-sm-12">
            <Button onClick={this.snooze(d,index, val)} style={{
              width: "20%",
              height: "40px",
              backgroundColor: "#4caf50",
              borderRadius: "20px",
              float: "right",
            }}>Snooze</Button>
          </div>
          <div className="mt-3 col-sm-12">
          <Button onClick={this.done(d,index)} style={{
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
        <tr style={{ textAlign: "center" }}>
        <td>Name</td>
        <td>Repeat</td>
        </tr>
        {this.display()}
      </div>
    );
  }
}

export default ViewAlert;

