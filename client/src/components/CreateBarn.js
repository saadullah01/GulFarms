import React, { Component } from "react";
import { Button, Modal, Form, FormGroup, Label, Input } from "reactstrap";
import AddAlert from "./AddAlerts";
import { connect, connectAdvanced } from "react-redux";
import { saveBarn } from "../actions/barnActions";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
class CreateBarn extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    barnName: "",
    Description: "",
    alerts: [],
    errors: {},
  };
  ids(name) {
    const dic = {
      farmId: this.props.match.params.fid,
      presetId: this.props.match.params.pid,
    };
    return parseInt(dic[name]);
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.allFarms.length !== prevProps.allFarms.length ||
      prevState.modal !== this.state.modal ||
      this.props.barns !== prevProps.barns
    ) {
      console.log(this.props.returnTo);
      this.props.history.push(
        "/home/farms/" +
          String(this.ids("farmId")) +
          "/" +
          String(this.ids("presetId"))
      );
    }
  };
  componentDidMount() {
    if (
      this.props.allFarms.length <= this.ids("farmId") ||
      this.props.presets.length <= this.ids("presetId")
    ) {
      this.props.history.push("/home/farms/" + String(this.ids("farmId")));
      return;
    }
  }
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
        linkedModel: "barn",
      };
    });
    const data = {
      id: this.props.presets[this.ids("presetId")]._id,
      barn: {
        barnName: this.state.barnName,
        description: this.state.Description,
        alerts: [],
      },
      alerts: alertsPacket,
    };
    this.props.saveBarn(data);
  };
  render() {
    var modal = false;
    const { errors } = this.props;
    return (
      <Modal
        style={{ position: "relative" }}
        size="lg"
        isOpen={this.state.modal}
        // className="modal-dialog"
        align="centre"
        toggle={this.toggle}
      >
        <p
          style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "#4caf50",
          }}
        >
          Create New Barn
        </p>
        <FontAwesomeIcon
          onClick={this.toggle}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            color: "#4caf50",
            margin: "5px",
          }}
          icon={faTimes}
          size="1x"
        />
        <Form className="mt-3 row" noValidate onSubmit={this.onSubmit}>
          <div className="col-sm-12 col-md-6">
            <div style={{ width: "90%", margin: "0 auto" }}>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="input-label-a">Name:</Label>
                <Input
                  className="input-field-a"
                  type="text"
                  id="barnName"
                  placeholder="Enter name of barn"
                  onChange={this.onChange}
                  value={this.state.barnName}
                  error={errors.barnName}
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
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
            <div style={{ width: "90%", margin: "0 auto" }}>
              <p
                className="add-a"
                style={{ fontSize: "30px", color: "#4caf50" }}
              >
                <FontAwesomeIcon icon={faBell} /> Add Alerts:
              </p>
              <AddAlert update={this.onAdd} title="Duration" Name="Alerts" />
            </div>
          </div>
          <div className="col-sm-12 mt-5 mb-2">
            <Button className="form-btn" type="submit">
              SAVE
            </Button>
            <Button
              className="form-btn"
              type="reset"
              onClick={this.toggle}
              style={{
                backgroundColor: "White",
                border: "1px solid gray",
                color: "#4caf50",
              }}
            >
              CANCEL
            </Button>
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
  presets: state.presetReducer.presets,
  barns: state.barnReducer.barns,
});
export default connect(mapStateToProps, { saveBarn })(withRouter(CreateBarn));
