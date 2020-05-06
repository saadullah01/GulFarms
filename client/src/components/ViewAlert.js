import React, { Component } from "react";
import {
  Label,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
} from "reactstrap";

class ViewAlert extends Component {
  // Can Add Constructor
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.Alerts,
      AlertDate: ""
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
  add = (d,index) => {
    this.remove(index)
    this.setState(
      (state) => {
        const data = state.data.concat({
          description: d.a_description,
          duration: this.state.AlertDate,
          selectedOption: d.selectedOption,
        
        });
      },
      () => this.submitt()
    );
  };
  submitt = () => {
    this.props.update(this.state.data);
  };

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
          <FormGroup>
            <Row style={{ flexWrap: "nowrap" }}>
                <Col>
                <Input
                                className="input-field-ad"
                                type="date"
                                placeholder="Start Date"
                                onChange={this.onChange}
                                value={this.state.AlertDate}
                                id="AlertDate"
                            /> 
                </Col>
                <Col>
                <Button className="login-btn" OnClick = {this.add}>Snooze</Button>
                </Col>
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
