import React, { Component } from "react";
import {
  Label,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Table
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Tab from "./sub_components/Tab";
import { relativeTimeRounding } from "moment";

class AddProduct extends Component {
  // Can Add Constructor
  constructor(props) {
    super(props);
    this.state = {
      Name: props.Name,
      title: props.title,
      modal: true,
      data: [],
      number: 1,
      ProductDescription: "",
      ProductDuration: "",
      ProductDate: "",
      selectedOption: "Year",
    };
  }

  submitt = () => {
    this.props.update(this.state.data);
  };
  add = (e) => {
    this.setState(
      (state) => {
        const data = state.data.concat({
          description: state.ProductDescription,
          duration: state.ProductDuration,
          selectedOption: state.selectedOption,
        });
        return {
          data,
        };
      },
      () => this.submitt()
    );
    this.resett();
  };
  resett = () => {
    this.setState({
      ProductDuration: "",
      ProductDescription: "",
      selectedOption: "Year",
    });
  };
  select = (e) => {
    this.setState({ selectedOption: e.target.id });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  remove = (d) => {
    this.setState(
      (state) => {
        const data = state.data.filter((item, j) => d !== j);
        return {
          data,
        };
      },
      () => this.submitt()
    );
    this.resett();
  };
  display = () => {
    const addedAlerts = this.state.data.map((d, index) =>
      <tr style={{textAlign: "center"}}>
        <td>{d.description}</td>
        <td>{d.duration}</td>
        <td>{d.selectedOption}</td>
        <td><FontAwesomeIcon onClick={() => this.remove(index)} style={{ color: "#4caf50" }} icon={faTimes} size="1x" /></td>
      </tr>
    );
    return (
      <Table responsive>
        <tbody>
          {addedAlerts}
        </tbody>
      </Table>
    );
  }

  render() {
    const types = ["Year", "Month", "Day", "week"]
    const duration_type = types.map((t) =>
      <DropdownItem id={t} onClick={this.select}>
        {t}
      </DropdownItem>
    );
    const { errors } = this.state;
    return (
      <div>
        {this.display()}
        <Row>
          <div className="pr-1 col-sm-5">
            <Input
              className="input-field-ad"
              type="text"
              placeholder="Product's Description"
              onChange={this.onChange}
              value={this.state.ProductDescription}
              id="ProductDescription"
            />
          </div>
          <div className="pl-1 pr-1 col-sm-3">
            <Input
              className="input-field-ad"
              type="text"
              placeholder="Duration"
              onChange={this.onChange}
              value={this.state.ProductDuration}
              id="ProductDuration"
            />
          </div>
          <div className="pl-1 pr-1 col-sm-4">
            <UncontrolledDropdown style={{backgroundColor: "#4caf50", textAlign: "center", borderRadius: "20px"}}>
              <DropdownToggle style={{color: "white"}} color="correct" caret>
                {this.state.selectedOption}
              </DropdownToggle>
              <DropdownMenu>
                {duration_type}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="mt-3 col-sm-12">
            <Button onClick={this.add} style={{
              width: "20%",
              height: "40px",
              backgroundColor: "#4caf50",
              borderRadius: "20px",
              float: "right",
            }}><FontAwesomeIcon icon={faPlus} size="1x" /></Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default AddProduct;
