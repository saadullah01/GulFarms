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
import ViewAlert from "./ViewAlert";
import { connect } from "react-redux";
import { saveFarm } from "../actions/farmActions";
import { withRouter } from "react-router-dom";
class ViewFarm extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    farmName: "",
    Location: "",
    Description: "",
    alerts: [],
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
            <Form className="add-farm" noValidate onSubmit={this.toggle}>
              <Row>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label for="fname" className="text-label">
                        Name:{" "}
                      </Label>
                    </Col>
                    <Col>
                      {this.state.farmName}
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
                      {this.state.Location}
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
                      {this.state.Description}
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
              <Row>
                <Col>
                <ViewAlert Alerts = {this.state.alerts}></ViewAlert>
                </Col>
                <Col></Col>
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
export default connect(mapStateToProps, { saveFarm })(withRouter(ViewFarm));
