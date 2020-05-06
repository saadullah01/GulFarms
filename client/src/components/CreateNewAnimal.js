import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBell, faClipboard, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Modal,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import AddTextField from './AddTextField'
import { connect } from "react-redux";
import { savePreset } from "../actions/presetActions";
import { withRouter } from "react-router-dom";
import AddProduct from './AddProduct';

class CreateNewAnimal extends Component {
    // Can Add Constructor
    state = {
        modal: true,
        AnimalName: "",
        track: "Keep track",
        errors: {},
        attributes: [],
        alerts: [],
        recordParents: false,
        recordOffspring: false,
        AlertDate: "",
        SelectedOption: "Year",
        AlertDuration: "",
        AlertDescription: "",

    }
    componentDidMount() {
        if (this.props.farms.length <= getId() || !this.props.farm.hasOwnProperty('animalPresets')) {
            this.props.history.push("/home/farms");
            return
        }
    }
    onChangeCheck = e => {
        this.setState(prevState => ({
            recordParents: !prevState.recordParents
        }))
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (
            this.props.farm.animalPresets.length !== prevProps.farm.animalPresets.length ||
            prevState.modal !== this.state.modal || this.props.allPresets.length !== prevProps.allPresets.length
        ) {
            this.props.history.push("/home/farms/" + String(getId()));
        }
    }
    onChangeCheckO = e => {
        this.setState(prevState => ({
            recordOffspring: !prevState.recordOffspring
        }))
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onAddT = e => {
        this.setState({ attributes: e });
    }
    onAddP = e => {
        this.setState({ alerts: e });
    }
    onSubmit = e => {
        e.preventDefault();
        const id = getId()
        const data = {
            ...this.state,
            farmId: id
        }
        console.log(data);
        this.props.savePreset(data)
    }
    KeepTrack() {
        const types = ["Year", "Month", "Day", "week"]
        const duration_type = types.map((t) =>
        <DropdownItem value={t} id="SelectedOption" onClick={this.onChange}>
            {t}
        </DropdownItem>
        );
        if (this.state.recordOffspring == true) {
            return (
                <Row>
                <div className="pl-1 pr-1 col-sm-3">
                  <Input
                    className="input-field-ad"
                    type="text"
                    placeholder="Cycle"
                    onChange={this.onChange}
                    value={this.state.AlertDuration}
                    id="AlertDuration"
                  />
                </div>
                <div className="pl-1 pr-1 col-sm-4">
                  <UncontrolledDropdown style={{backgroundColor: "#4caf50", textAlign: "center", borderRadius: "20px"}}>
                    <DropdownToggle style={{color: "white"}} color="correct" caret>
                      {this.state.SelectedOption}
                    </DropdownToggle>
                    <DropdownMenu>
                      {duration_type}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Row>
            )
        }

    }
    render() {
        var modal = false
        const { errors } = this.state;
        return (
            <Modal
                style={{ position: "relative" }}
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
                }}>Create New Animal</p>
                <FontAwesomeIcon
                    onClick={this.toggle}
                    style={{ position: "absolute", top: "0px", right: "0px", color: "#4caf50", margin: "5px" }} icon={faTimes} size="1x" />
                <Form className="mt-3 row" noValidate onSubmit={this.onSubmit}>
                    <div className="col-sm-12 col-md-6">
                        <div style={{ width: "90%", margin: "0 auto" }}>
                            <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                                <Label className="input-label-a">Name:</Label>
                                <Input
                                    className="input-field-a"
                                    type="text"
                                    id="AnimalName"
                                    placeholder="Enter Animal Name"
                                    onChange={this.onChange}
                                    value={this.state.AnimalName}
                                    error={errors.AnimalName}
                                />
                            </FormGroup>
                            <div className="row">
                                <div className="col-sm-12">
                                    <p style={{ fontSize: "30px", color: "#4caf50" }}>Attributes</p>
                                    <AddTextField id= "attributes" update={this.onAddT}></AddTextField>
                                </div>
                                <div className="mt-3 col-sm-12">
                                    <p style={{ fontSize: "30px", color: "#4caf50" }}>Products</p>
                                    <AddProduct Name="Products" title="Cycle" id = "alerts" update={this.onAddP} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div style={{ width: "90%", margin: "0 auto" }}>
                            <p className="add-a" style={{ fontSize: "30px", color: "#4caf50" }}><FontAwesomeIcon icon={faClipboardCheck} style={{ marginRight: "10px" }} />Record</p>
                            <FormGroup>
                                <Label>Record Parents:</Label>
                                <Input
                                    style={{ margin: "7px" }}
                                    type="checkbox"
                                    onChange={this.onChangeCheck}
                                    checked={this.state.recordParents}
                                    id="recordParents"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Record Offspring:</Label>
                                <Input
                                    style={{ margin: "7px" }}
                                    type="checkbox"
                                    onChange={this.onChangeCheckO}
                                    checked={this.state.recordOffspring}
                                    id="recordOffspring"
                                />
                            </FormGroup>
                            {this.KeepTrack()}
                        </div>
                    </div>
                    <div className="col-sm-12 mt-5 mb-2">
                        <Button className="form-btn" type="reset" onClick={this.toggle}>Cancel</Button>
                        <Button className="form-btn" type="submit">Save</Button>
                    </div>
                </Form>
            </Modal>
        )
    }
}
const getId = () => {
    const id = (window.location.href.substring(window.location.href.lastIndexOf('farms/') + 6, window.location.href.lastIndexOf('/')))
    console.log("this fired", id)
    return parseInt(id)
}
const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms,
    farm: (state.farmReducer.farms)[getId()],
    allPresets: state.presetReducer.presets
});
export default connect(mapStateToProps, { savePreset })(withRouter(CreateNewAnimal));
