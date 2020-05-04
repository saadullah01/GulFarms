import React, { Component, useState } from 'react';
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
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import AddAlert from './AddAlerts';
import AddTextField from './AddTextField'
import { connect } from "react-redux";
import { savePreset } from "../actions/presetActions";
import { withRouter } from "react-router-dom";
class CreateNewAnimal extends Component {

    // Can Add Constructor
    state = {
        modal: true,
        AnimalName: "",
        p1: "",
        track: "Keep track",
        errors: {},
        attributes: [],
        alerts: [],

    }
    componentDidMount() {
        if (this.props.farms.length <= getId()) {
            this.props.history.push("/home/farms");
            return
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (
            this.props.farm.animalPresets.length !== prevProps.farm.animalPresets.length ||
            prevState.modal !== this.state.modal
        ) {
            this.props.history.push("/home/farms/" + String(getId()));
        }
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
            AnimalName: this.state.AnimalName,
            p1: this.state.p1,
            track: this.state.track,
            attributes: this.state.attributes,
            alerts: this.state.alerts,
            farmID:id
        }
        console.log(data);
        this.props.savePreset(data)
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
                                <h3 className="h3" >
                                    Create New Animal
                    </h3>
                            </Col>


                        </Row>

                    </ModalHeader></center>
                <ModalBody>
                    <Container>
                        <Form className="add-farm" noValidate onSubmit={this.onSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup><Row>

                                        <Row>
                                            <Input
                                                className="input-field-heading"
                                                type="text"
                                                placeholder="Enter Animal Name"
                                                onChange={this.onChange}
                                                value={this.state.AnimalName}
                                                error={errors.AnimalName}
                                                id="AnimalName"
                                            />
                                        </Row>

                                    </Row></FormGroup>



                                    <Col>
                                        <Row>
                                            <Label className="h4">
                                                Attributes:
                            </Label>
                                        </Row>
                                        <Row>
                                            <Col><AddTextField Name="Attribute" update={this.onAdd_Att}></AddTextField></Col>

                                        </Row>
                                    </Col>

                                    <Col>
                                        <Row>
                                            <Label className="h4">
                                                Products:
                            </Label>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <AddAlert Name="Products" title="Cycle" update={this.onAdd}></AddAlert>
                                            </Col>
                                            <Col />
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Label className="h4">
                                                Parents
                            </Label>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label className="text-label">
                                                    Record Parents:
                            </Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <UncontrolledDropdown className="edit-info">
                                                    <DropdownToggle color="correct" caret>
                                                        {this.state.track}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem id="Keep track" onClick={this.select}>Keep track</DropdownItem>
                                                        <DropdownItem divider />
                                                        <DropdownItem id="Do Not Keep track" onClick={this.select}>Do Not Keep track</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                            <Col />
                                            <Col />
                                        </Row>
                                    </Col>
                                </Col>


                            </Row>
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
