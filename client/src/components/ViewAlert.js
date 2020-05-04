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
} from "reactstrap";

class ViewAlert extends Component {
  // Can Add Constructor
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.Alerts,
    };
  }



  display() {
    return this.state.data.map((d, index) => {
      return (
        <Row key={index} style={{ flexWrap: "nowrap" }}>
          <Col>
            <Label className="text-label-b">{d.description}</Label>
          </Col>
          <Col>
            <Label className="text-label-b">{d.duration}</Label>
          </Col>
          <FormGroup>
            <Row style={{ flexWrap: "nowrap" }}>
              <Col>
                <Label className="text-label-b">{d.selectedOption}</Label>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </FormGroup>
        </Row>
      );
    });
  }

  render() {
    const { errors } = this.state;
    return (
        <div>
                <Row>
                    <Col><Label className= "text-label">Alerts</Label></Col>
                </Row>
                <Row>
                <Col>
                    <Label className="text-label-b">Name</Label>
                </Col>
                <Col>
                    <Label className="text-label-b">Duration</Label>
                </Col>
                <FormGroup>
                    <Row>
                    <Col>
                        <Label className="text-label-b">Repeat</Label>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    </Row>
                </FormGroup>
                {this.display()}
                </Row>
        </div>          
    );
  }
}

export default ViewAlert;
