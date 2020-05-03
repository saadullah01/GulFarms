import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import AddAlert from "./AddAlerts";
import { connect } from "react-redux";
import { saveFarm } from "../actions/farmActions";
import { withRouter } from "react-router-dom";
class CreateFarm extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    farmName: "",
    Location: "",
    Description: "",
    alerts: [{ description: "L" }],
    errors: {},
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.allFarms.length !== prevProps.allFarms.length ||
      prevState.modal !== this.state.modal
    ) {
      this.props.history.push("/home/farms");
    }
  };

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onAdd = (e) => {
    this.setState({ alerts: e });
  };

  onSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    const alertsPacket = this.state.alerts.map((alert) => {
      return {
        name: alert.description,
        duration: alert.duration,
        durationType: alert.selectedOption,
        linkedModel: "farm",
      };
    });
    const data = {
      farm: {
        farmName: this.state.farmName,
        Location: this.state.Location,
        Description: this.state.Description,
        alerts: [],
      },
      alerts: alertsPacket,
    };
    // console.log(data);
    this.props.saveFarm(data);
  };
  render() {
    var modal = false;
    const { errors } = this.props;
    return (
      <Modal
        size="lg"
        isOpen={this.state.modal}
        className="modal-dialog"
        align="centre"
        toggle={this.toggle}
      >
        <center>
          <ModalHeader toggle={this.toggle}>
            <Row>
              <Col />
              <Col xs="13">
                <h3 className="h3white">Create New Farm</h3>
              </Col>
            </Row>
          </ModalHeader>
        </center>
        <ModalBody>
          <Container>
            <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
              <Row>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label for="fname" className="text-label">
                        Name:{" "}
                      </Label>
                    </Col>
                    <Col>
                      <Input
                        className="input-field-a"
                        type="text"
                        id="farmName"
                        placeholder="Enter name of farm"
                        onChange={this.onChange}
                        value={this.state.farmName}
                        error={errors.farmName}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label for="flocation" className="text-label">
                        Location:{" "}
                      </Label>
                    </Col>
                    <Col>
                      <Input
                        className="input-field-a"
                        type="text"
                        id="Location"
                        placeholder="Enter location"
                        onChange={this.onChange}
                        value={this.state.Location}
                        error={errors.Location}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label for="Description" className="text-label">
                        Description:{" "}
                      </Label>
                    </Col>
                    <Col>
                      <Input
                        className="input-field-a"
                        type="textarea"
                        placeholder="Enter description"
                        onChange={this.onChange}
                        value={this.state.Description}
                        error={errors.Description}
                        id="Description"
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
              <Row>
                <Col>
                  <AddAlert
                    update={this.onAdd}
                    Name="Alerts"
                    title="Duration"
                  ></AddAlert>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Button className="login-btn" type="submit">
                  Save
                </Button>
              </Row>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.islogged,
  errors: state.errorReducer.errors,
  allFarms: state.farmReducer.farms,
});
export default connect(mapStateToProps, { saveFarm })(withRouter(CreateFarm));
