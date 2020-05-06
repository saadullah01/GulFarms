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
import { connect, connectAdvanced } from "react-redux";
import { saveBarn } from "../actions/barnActions";
import { withRouter } from "react-router-dom";
class CreateBarn extends Component {
    // Can Add Constructor
    state = {
        modal: true,
        barnName: "",
        Description: "",
        alerts: [],
        errors: {},
    };
    ids(name){
        const dic ={
        farmId:this.props.match.params.fid,
        presetId:this.props.match.params.pid
        }
        return parseInt(dic[name])
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (
            (this.props.allFarms.length !== prevProps.allFarms.length) ||
            (prevState.modal !== this.state.modal) ||
            (this.props.barns !== prevProps.barns)
        ) {
            console.log(this.props.returnTo)
            this.props.history.push("/home/farms/"+String(this.ids("farmId"))+"/"+String(this.ids("presetId")));
        }
    };
    componentDidMount() {
        if (this.props.presets.length <= this.ids("presetId")) {
            this.props.history.push("/home/farms/"+String(this.ids("farmId")));
            return
        }
    }
    toggle = () => {
        console.log(this.state.modal)
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
            barn: {
                barnName: this.state.barnName,
                Description: this.state.Description,
                alerts: [],
            },
            alerts: alertsPacket,
        };
        // console.log(data);
        this.props.saveBarn(data);
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
                                <h3 className="h3white">Create New Barn</h3>
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
                                                id="barnName"
                                                placeholder="Enter name of farm"
                                                onChange={this.onChange}
                                                value={this.state.barnName}
                                                error={errors.barnName}
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
    presets: state.presetReducer.presets,
    barns: state.barnReducer.barns
});
export default connect(mapStateToProps, { saveBarn })(withRouter(CreateBarn));
