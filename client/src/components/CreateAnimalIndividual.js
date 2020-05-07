import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faBell,
    faClipboard,
    faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
    Button,
    Modal,
    Form,
    Label,
    Input,
    Row,
    UncontrolledCollapse,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveInstance } from "../actions/barnActions";

class CreateAnimalIndividual extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            tag: "",
            AnimalName: "",
            p1: "",
            p2: "",
            errors: {},
            attributes: [
                {
                    Name: "l",
                    Type: "Options",
                    Unit: "kg",
                    Option: [1, 2, 3],
                    Value: "",
                },
            ], //From DB
            AttributesUpdate: [],
            Products: [
                { description: "des", duration: "dur", selectedOption: "Year" },
            ], //fromm DB
            ProductsUpdate: [],
            quant: "",
            date: "",
            recordParents: true,
        };
    }
    componentDidMount() {
        if (
            this.props.farms.length <= this.ids("farm") ||
            this.props.presets.length <= this.ids("preset") ||
            this.props.barns.length <= this.ids("barn")
        ) {
            this.props.history.push("/home/farms/");
            return;
        }
        this.setState({
            modal: true,
            AnimalName: this.props.presets[this.ids("preset")].name,
            tag: "",
            p1: "",
            p2: "",
            errors: this.props.errors,
            attributes: this.mapAttributes(
                this.props.presets[this.ids("preset")].attributes
            ), //From DB
            AttributesUpdate: [],
            Products: [],
            Products: this.mapProducts(
                this.props.presets[this.ids("preset")].products
            ), //fromm DB
            ProductsUpdate: [],
            quant: "",
            date: "",
            recordParents: this.props.presets[this.ids("preset")].linkParents,
        });
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.modal !== this.state.modal ||
            this.props.barns !== prevProps.barns
        ) {
            this.props.history.push(
                "/home/farms/" +
                String(this.ids("farm")) +
                "/" +
                String(this.ids("preset")) +
                "/" +
                String(this.ids("barn"))
            );
        }
    };
    mapAttributes(atts) {
        const key = {
            number: "numeric",
            string: "string",
            option: "options",
        };
        return atts
            .map((a) => {
                if (a.name !== "parents")
                    return {
                        ...a,
                        Name: a.name,
                        Type: key[a.attributeType],
                        Unit: a.unit,
                        Option: a.options,
                        Value: "",
                        id: a._id,
                    };
            })
            .filter((x) => x !== undefined);
    }
    mapProducts(prods) {
        return prods.map((p) => {
            return {
                ...p,
                description: p.name,
                Value: ""
            };
        });
    }
    ids(name) {
        const dic = {
            farm: this.props.match.params.fid,
            preset: this.props.match.params.pid,
            barn: this.props.match.params.bid,
        };
        return parseInt(dic[name]);
    }
    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onAdd = (e) => {
        this.setState({ Products: e });
    };
    onAdd_Att = (e) => {
        this.setState({ attributes: e });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const attvals = []
        const prodvals = []
        if (this.state.recordParents) {
            attvals.push([])
        }
        if (this.props.presets[this.ids("preset")].trackOffspring) {
            prodvals.push([])
        }
        this.state.attributes.map(atr => attvals.push(atr.Value))
        this.state.Products.map(pro => prodvals.push(pro.Value))
        const newInstance = {
            preset: this.props.presets[this.ids("preset")]._id,
            barn: this.props.barns[this.ids("barn")]._id,
            tag: this.state.tag,
            name: this.state.tag,
            stopOffspring: ((this.state.attributes.find(att => att.name === "gender").Value) === "male"),
            attributeValues:attvals,
            productValues:prodvals
        };
        this.props.saveInstance(newInstance,this.ids("barn"))
    };
    remove = (d) => {
        this.setState((state) => {
            const attributes = state.attributes.filter((item, j) => d !== j);
            return {
                attributes,
            };
        });
    };
    removeProduct = (d) => {
        this.setState((state) => {
            const Products = state.Products.filter((item, j) => d !== j);
            return {
                Products,
            };
        });
    };
    Parents() {
        if (this.state.recordParents === true) {
            return (
                <div className="row">
                    <p style={{ fontSize: "30px", color: "#4caf50" }}>Parents</p>
                    <Label className="input-label-a">Record Parents:</Label>
                    <div className="mt-3 col-sm-12">
                        <Button
                            id="toggler"
                            style={{
                                width: "20%",
                                height: "40px",
                                backgroundColor: "#4caf50",
                                borderRadius: "20px",
                                float: "right",
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} size="1x" />
                        </Button>

                        <UncontrolledCollapse toggler="#toggler">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Input
                                            className="input-field-add"
                                            type="text"
                                            placeholder="Enter Parent 1"
                                            onChange={this.onChange}
                                            value={this.state.p1}
                                            error={this.state.errors.p1}
                                            id="p1"
                                        />
                                    </Row>
                                    <Row>
                                        <Input
                                            className="input-field-add"
                                            type="text"
                                            placeholder="Enter Parent 2"
                                            onChange={this.onChange}
                                            value={this.state.p2}
                                            error={this.state.errors.p2}
                                            id="p2"
                                        />
                                    </Row>
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>
                    </div>
                </div>
            );
        }
    }

    opt = (d, index) => {
        return d.Option.map((t) => (
            <DropdownItem value={t} onClick={(e) => this.onChangeAttributes(d, index, e)}>
                {t}
            </DropdownItem>
        ));
    };
    onChangeAttributes = (d, index, e) => {
        const update = {
            ...d,
            Value: e.target.value
        }
        this.setState((state, props) => {
            return {
                attributes: [
                    ...(state.attributes.slice(0, index)),
                    update,
                    ...(state.attributes.slice(index + 1))
                ]
            }
        })
    }
    helper = (d, index) => {
        if (d.Type === "numeric") {
            return (
                <tbody>
                    <tr>
                        <td>{d.Name}</td>
                        <td>{d.Unit}</td>
                        <td><Input
                            type="text"
                            placeholder="Value"
                            onChange={(e) => this.onChangeAttributes(d, index, e)}
                            value={d.Value}
                            id="quant"
                        /></td>
                    </tr>
                </tbody>
            );
        } else if (d.Type === "string") {
            return (
                <tbody>
                    <tr>
                        <td>{d.Name}</td>
                        <td>{d.Unit}</td>
                        <td><Input
                            type="text"
                            placeholder="Value"
                            onChange={(e) => this.onChangeAttributes(d, index, e)}
                            value={d.Value}
                            id="quant"
                        /></td>
                    </tr>
                </tbody>
            );
        } else if (d.Type === "options") {
            return (
                <tbody>
                    <tr>
                        <td>{d.Name}</td>
                        <td></td>
                        <td><UncontrolledDropdown
                            style={{
                                backgroundColor: "#4caf50",
                                textAlign: "center",
                                borderRadius: "20px",
                            }}
                        >
                            <DropdownToggle style={{ color: "white" }} color="correct" caret>
                                {d.Value}
                            </DropdownToggle>
                            <DropdownMenu>{this.opt(d, index)}</DropdownMenu>
                        </UncontrolledDropdown></td>
                    </tr>
                </tbody>
            );
        }
    };
    Attributes() {
        const attributes = this.state.attributes.map((d, index) =>
            this.helper(d, index)
        );
        return (
            <Table responsive>
                {attributes}
            </Table>
        );
    }
    onChangeProduct = (d, index, e) => {
        const update = {
            ...d,
            Value: e.target.value
        }
        this.setState((state, props) => {
            return {
                Products: [
                    ...(state.Products.slice(0, index)),
                    update,
                    ...(state.Products.slice(index + 1))
                ]
            }
        })
    }
    Products() {
        const products = this.state.Products.map((d, index) =>
            <tr>
                <td>{d.description}</td>
                <td>
                    <Input
                        type="date"
                        placeholder="Enter Starting Date (mm/dd/yyyy)"
                        onChange={(e) => this.onChangeProduct(d, index, e)}
                        value={d.Value}
                        t={d.Value}
                        id="date"
                    />
                </td>
            </tr>
        );
        return (
            <tbody>
                {products}
            </tbody>
        );
    }
    render() {
        var modal = false;
        const { errors } = this.state;
        return (
            <Modal
                size="lg"
                isOpen={this.state.modal}
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
                    Create New {this.state.AnimalName}
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
                                <Label className="input-label-a">Tag:</Label>
                                <Input
                                    className="input-field-a"
                                    type="text"
                                    id="tag"
                                    placeholder="Enter tag"
                                    onChange={this.onChange}
                                    value={this.state.tag}
                                    error={errors.tag}
                                />
                            </FormGroup>
                            <div className="row">
                                <div className="col-sm-12">
                                    <p style={{ fontSize: "30px", color: "#4caf50" }}>
                                        Attributes
                  </p>
                                    {this.Attributes()}
                                </div>
                                <div className="mt-3 col-sm-12">
                                    <p style={{ fontSize: "30px", color: "#4caf50" }}>Products</p>
                                    {this.Products()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div style={{ width: "90%", margin: "0 auto" }}>
                            <p
                                className="add-a"
                                style={{ fontSize: "30px", color: "#4caf50" }}
                            >
                                <FontAwesomeIcon
                                    icon={faClipboardCheck}
                                    style={{ marginRight: "10px" }}
                                />
                Record
              </p>
                            {this.Parents()}
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
    farms: state.farmReducer.farms,
    presets: state.presetReducer.presets,
    barns: state.barnReducer.barns,
});
export default connect(
    mapStateToProps,
    { saveInstance }
)(withRouter(CreateAnimalIndividual));
