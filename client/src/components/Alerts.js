import React, { Component } from "react";
import { Table, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getAlerts } from "../actions/alertsAction";
import { connect } from "react-redux";
import { saveFarm } from "../actions/farmActions";
import { withRouter } from "react-router-dom";

function OneAlert(props) {
  const color = props.index % 2 ? "#d7eecd" : "rgb(218,238,225)";
  return (
    <tr style={{ backgroundColor: color }}>
      <td>{props.name}</td>
      <td>{props.id}</td>
      <td>{props.alertDesc}</td>
      <td>{props.due}</td>
      <td>
        {props.unit}
        <Link to={props.link}>
          <FontAwesomeIcon className="end-link" icon={faAngleRight} size="lg" />
        </Link>
      </td>
    </tr>
  );
}

class Alerts extends Component {
  state = {
    alerts: this.props.allAlerts,
  };
  componentDidMount() {
    this.props.getAlerts();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allAlerts !== prevState.alerts) {
      this.setState({
        ...prevState,
        alerts: this.props.allAlerts,
      });
    }
  };
  render() {
    const url = "/home/alerts/";
    const alerts = this.state.alerts.map((a, i) => (
      <OneAlert
        link={url.concat(i)}
        index={i}
        key={i}
        name={a.name}
        id={a.id}
        alertDesc={a.alertDesc}
        due={a.due}
        unit={a.unit}
      />
    ));
    return (
      <div style={{ width: "100%" }}>
        <p className="alert-head">
          <FontAwesomeIcon className="alert-icon" icon={faBell} />
          Alerts
        </p>
        <Table className="alert-table" responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Alert Description</th>
              <th>Due</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>{alerts}</tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  allAlerts: state.alertReducer.alerts,
  errors: state.errorReducer.errors,
});
export default connect(mapStateToProps, { getAlerts })(withRouter(Alerts));
