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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
class CreateFarm extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    farmName: "",
    Location: "",
    Description: "",
    alerts: [],
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
        style={{position: "relative"}}
        size="lg"
        isOpen={this.state.modal}
        // className="modal-dialog"
        align="centre"
        toggle={this.toggle}
      >
        <p style={{
          fontSize: "2rem",
          textAlign: "center",
          color: "#4caf50"
        }}>Create New Farm</p>
        <FontAwesomeIcon
          onClick={this.toggle}
          style={{position: "absolute", top:"0px", right:"0px", color: "#4caf50", margin: "5px"}} icon={ faTimes } size="1x" />
        <Form className="mt-3 row" noValidate onSubmit={this.onSubmit}>
          <div className="col-sm-12 col-md-6">
            <div style={{width: "90%", margin: "0 auto"}}>
              <FormGroup style={{width: "100%", paddingBottom: "30px"}}>
                <Label className="input-label-a">Name:</Label>
                <Input
                  className="input-field-a"
                  type="text"
                  id="farmName"
                  placeholder="Enter name of farm"
                  onChange={this.onChange}
                  value={this.state.farmName}
                  error={errors.farmName}
                />
              </FormGroup>
              <FormGroup style={{width: "100%", paddingBottom: "30px"}}>
                <Label className="input-label-a">Location:</Label>
                <Input
                  className="input-field-a"
                  type="text"
                  id="Location"
                  placeholder="Enter location"
                  onChange={this.onChange}
                  value={this.state.Location}
                  error={errors.Location}
                />
              </FormGroup>
              <FormGroup style={{width: "100%", paddingBottom: "30px"}}>
                <Label className="input-label-a">Description:</Label>
                  <Input
                  className="input-field-a"
                  type="textarea"
                  placeholder="Enter description"
                  onChange={this.onChange}
                  value={this.state.Description}
                  error={errors.Description}
                  id="Description"
                  rows="5"
                />
              </FormGroup>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div style={{width: "90%", margin: "0 auto"}}>
              <p className="add-a" style={{fontSize: "30px", color: "#4caf50"}}><FontAwesomeIcon icon={faBell} /> Add Alerts:</p>
              <AddAlert 
                update={this.onAdd}
                title="Duration"
              />
            </div>
          </div>
          <div className="col-sm-12 mt-5 mb-2">
            <Button className="form-btn" type="reset" onClick={this.toggle}>Cancel</Button>
            <Button className="form-btn" type="submit">Save</Button>
          </div>
        </Form>
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
