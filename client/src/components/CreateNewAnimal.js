import React, { Component, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import AddProduct from './AddProduct';
import AddTextField from './AddTextField'
import { connect } from "react-redux";
import { savePreset } from "../actions/presetActions";
import { withRouter } from "react-router-dom";
import AddAlert from './AddAlerts';

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
    select = e => {
        this.setState({ track: e.target.id });
    }
    onAdd = e => {
        this.setState({ alerts: e });
    }

    onAdd_Att = e => {
        this.setState({ attributes: e });
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
    selectTime = (e) => {
        this.setState({ selectedOption: e.target.id });
    };
    KeepTrack() {
        if (this.state.recordOffspring == true) {
            return (
                <div>

                    <Row style={{ flexWrap: "nowrap" }}>
                        <Col>
                            <Input
                                className="input-field-ad"
                                type="text"
                                placeholder="Name"
                                onChange={this.onChange}
                                value={this.state.AlertDescription}
                                id="AlertDescription"
                            />
                        </Col>
                        <Col>
                            <Input
                                className="input-field-ad"
                                type="text"
                                placeholder="Cycle"
                                onChange={this.onChange}
                                value={this.state.AlertDuration}
                                id="AlertDuration"
                            />
                        </Col>
                        <FormGroup>
                            <Col>
                                <Row>
                                    <UncontrolledDropdown className="edit-info">
                                        <DropdownToggle color="correct" caret>
                                            {this.state.SelectedOption}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem id="Year" onClick={this.selectTime}>
                                                Year
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem id="Month" onClick={this.selectTime}>
                                                Month
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem id="Day" onClick={this.selectTime}>
                                                Day
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem id="week" onClick={this.selectTime}>
                                                week
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Row>

                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col>
                            <Row>
                              <Input
                                className="input-field-ad"
                                type="date"
                                placeholder="Start Date"
                                onChange={this.onChange}
                                value={this.state.AlertDate}
                                id="AlertDate"
                            />  
                            </Row>
                            </Col>
                        </FormGroup>
                    </Row>
                </div>
            )
        }

    }
    render() {
        var modal = false
        const { errors } = this.state;
        return (
            <Modal size="lg" isOpen={this.state.modal} className="modal-dialog" align="centre" toggle={this.toggle} >
                <center>
                    <ModalHeader toggle={this.toggle} >
                        <Row>
                            <Col />
                            <Col xs="13">
                                <h3 className="h3white" >Create New Animal</h3>
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
                                            <Label className="text-label" >Name:</Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                className="input-field-a row align-items-center"
                                                type="text"
                                                placeholder="Enter Animal Name"
                                                onChange={this.onChange}
                                                value={this.state.AnimalName}
                                                error={errors.AnimalName}
                                                id="AnimalName"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Row>

                            <Row />

                            <Row>
                                <Col>
                                    <Row>
                                        <Label className="h4">Attributes: </Label>
                                    </Row>
                                    <Row />
                                    <Row>
                                        <Col>
                                            <AddTextField Name="Attribute" update={this.onAdd_Att}></AddTextField>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Label className="h4">Products:</Label>
                            </Row>
                            <Row>
                                <Col>
                                    <AddAlert Name="Products" title="Cycle" update={this.onAdd}></AddAlert>
                                </Col>
                                <Col />
                            </Row>
                            <Row />
                            <Row />
                            <Row xs="4">
                                <Label className="text-label">Record Parents:</Label>
                                <Col xs="auto">
                                    <Input
                                        className="input-field-check"
                                        type="checkbox"
                                        onChange={this.onChangeCheck}
                                        checked={this.state.recordParents}
                                        id="Record Parents"
                                    />
                                </Col>
                            </Row>
                            <Row xs="4" >
                                <Label className="text-label">Record Offspring:</Label>
                                <Col xs="auto">
                                    <Input
                                        className="input-field-check"
                                        type="checkbox"
                                        onChange={this.onChangeCheckO}
                                        checked={this.state.recordOffspring}
                                        id="Record Offspring"
                                    />
                                </Col>
                            </Row>
                            {this.KeepTrack()}
                            <Row>
                                <Button className="login-btn" type="submit">Save</Button>
                            </Row>
                        </Form>
                    </Container>
                </ModalBody>
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
