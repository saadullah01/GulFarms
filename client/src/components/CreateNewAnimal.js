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
} from 'reactstrap';
import AddProduct from './AddProduct';
import AddTextField from './AddTextField'
import { connect } from "react-redux";
import { savePreset } from "../actions/presetActions";
import { withRouter } from "react-router-dom";
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
        recordOffspring: false

    }
    componentDidMount() {
        if (this.props.farms.length <= getId()) {
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
            prevState.modal !== this.state.modal
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
            farmID: id
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
                                        <Col>
                                            <Label>Name:</Label>
                                        </Col>
                                        <Col>
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
                                        </Col>
                                        <Col />
                                        <Col />

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
                                                <AddProduct Name="Products" title="Cycle" update={this.onAdd}></AddProduct>
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
                                            <Col>
                                                <Input
                                                    className="input-field-check"
                                                    type="checkbox"
                                                    onChange={this.onChangeCheck}
                                                    checked={this.state.recordParents}
                                                    id="Record Parents"
                                                />
                                            </Col>
                                            <Col />
                                            <Col />
                                        </Row>
                                    </Col>
                                    
                                    <Col>
                                        <Row>
                                            <Label className="h4">
                                                Offspring
                                            </Label>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label className="text-label">
                                                    Record Offspring:
                                            </Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className="input-field-check"
                                                    type="checkbox"
                                                    onChange={this.onChangeCheckO}
                                                    checked={this.state.recordOffspring}
                                                    id="Record Offspring"
                                                />
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
