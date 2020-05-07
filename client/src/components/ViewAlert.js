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
      alert: [{description: "awae", duration:"3", selectedOption:"Year", date: "12/02/1999"},{description: "awae", duration:"3", selectedOption:"Year", date: "12/02/1999"} ],
      AlertDate: "",
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
        const alert = state.alert.filter((item, j) => d !== j);
        return {
          alert,
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
  valueChange = (d,index,e) =>{
    const update = {
        ...d,
        date: e.target.value
    }
    this.setState((state, props) => {
        return {
            alert: [
                ...(state.alert.slice(0, index)),
                update,
                ...(state.alert.slice(index + 1))
            ]
        }
    })
  }
  display() {
    console.log(this.state.alert)
    console.log(this.state.Update, "d")
    return this.state.alert.map((d, index) => {
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
              id="AlertDate"
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

export default ViewAlert;

