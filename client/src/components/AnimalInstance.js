import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBalanceScale,
    faHandPointRight,
    faBoxOpen,
    faPen,
    faBars,
    faAngleRight,
    faPlusCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux"
import {getBarnDetail} from "../actions/barnActions"

function Instance(props) {
    const color = (props.index % 2) ? "#e6ffee" : "#80ffaa";
    return (
        <tr style={{ "background-color": color }}>
            <td>{props.id}</td>
            <td>{props.gender}</td>
            <td>{props.att1}</td>
            <td>{props.att2}</td>
            <td>{props.alert}</td>
            <td>
                <Link to={props.link}>
                    <FontAwesomeIcon color="#4caf50" icon={faAngleRight} size="lg" />
                </Link>
            </td>
        </tr>
    );
}

class AnimalInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            products: [],
            animalInstances: [],
            avgWeight: null,
            numAnimals: null,
            description: null
        }
    }
    ids(name) {
        const dic = {
            farm: this.props.match.params.fid,
            preset: this.props.match.params.pid,
            barn:this.props.match.params.bid
        }
        return parseInt(dic[name])
    }
    componentDidMount() {
        if(this.props.farms.length <= this.ids("farm") ||
        this.props.presets.length <= this.ids("preset") ||
        this.props.barns.length <=this.ids("barn") ){
            this.props.history.push("/home/farms");
            return
        }
        else{
            this.props.getBarnDetail(this.ids("barn"))
        }
        /* Dummy Animal Instance */
        this.setState({
            name: "loading...",
            products: [
                { name: "loading" },
                { name: "loading" },
                { name: "loading" }
            ],
            avgWeight: "loading",
            description: "loading",
            animalInstances: [
                {
                    alive: true,
                    attributes: [
                        {name: "id", value: 1},
                        {name: "gender", value: "M"},
                        {name: "weight", value: 70},
                        {name: "lol1", value: "idk"},
                        {name: "lol2", value: "idk"},
                        {name: "lol3", value: "idk"}
                    ],
                    products: [],
                    alerts: [],
                    _id: "5eb2e8308b7bc517817af50b",
                    name: "first animal",
                    preset: "5eb2ddd28c0c5a0f3f61b26a",
                    tag: 1,
                    comment: "this is a test to see if parent att and offspring products are added",
                    parents: "5eb2e82f8b7bc517817af507",
                    offspring: "5eb2e82f8b7bc517817af509",
                    __v: 0
                },
                {
                    alive: true,
                    attributes: [
                        {name: "id", value: 1},
                        {name: "gender", value: "M"},
                        {name: "weight", value: 70},
                        {name: "lol1", value: "idk"},
                        {name: "lol2", value: "idk"},
                        {name: "lol3", value: "idk"}
                    ],
                    alerts: [],
                    products: [],
                    _id: "5eb2e8308b7bc517817af50b",
                    name: "first animal",
                    preset: "5eb2ddd28c0c5a0f3f61b26a",
                    tag: 1,
                    comment: "this is a test to see if parent att and offspring products are added",
                    parents: "5eb2e82f8b7bc517817af507",
                    offspring: "5eb2e82f8b7bc517817af509",
                    __v: 0
                },
                {
                    alive: true,
                    attributes: [
                        {name: "id", value: 1},
                        {name: "gender", value: "M"},
                        {name: "weight", value: 70},
                        {name: "lol1", value: "idk"},
                        {name: "lol2", value: "idk"},
                        {name: "lol3", value: "idk"}
                    ],
                    alerts: [],
                    products: [],
                    _id: "5eb2e8308b7bc517817af50b",
                    name: "first animal",
                    preset: "5eb2ddd28c0c5a0f3f61b26a",
                    tag: 1,
                    comment: "this is a test to see if parent att and offspring products are added",
                    parents: "5eb2e82f8b7bc517817af507",
                    offspring: "5eb2e82f8b7bc517817af509",
                    __v: 0
                },
                {
                    alive: true,
                    attributes: [
                        {name: "id", value: 1},
                        {name: "gender", value: "M"},
                        {name: "weight", value: 70},
                        {name: "lol1", value: "idk"},
                        {name: "lol2", value: "idk"},
                        {name: "lol3", value: "idk"}
                    ],
                    alerts: [],
                    products: [],
                    _id: "5eb2e8308b7bc517817af50b",
                    name: "first animal",
                    preset: "5eb2ddd28c0c5a0f3f61b26a",
                    tag: 1,
                    comment: "this is a test to see if parent att and offspring products are added",
                    parents: "5eb2e82f8b7bc517817af507",
                    offspring: "5eb2e82f8b7bc517817af509",
                    __v: 0
                },
                {
                    alive: true,
                    attributes: [
                        {name: "id", value: 1},
                        {name: "gender", value: "M"},
                        {name: "weight", value: 70},
                        {name: "lol1", value: "idk"},
                        {name: "lol2", value: "idk"},
                        {name: "lol3", value: "idk"}
                    ],
                    alerts: [],
                    products: [],
                    _id: "5eb2e8308b7bc517817af50b",
                    name: "first animal",
                    preset: "5eb2ddd28c0c5a0f3f61b26a",
                    tag: 1,
                    comment: "this is a test to see if parent att and offspring products are added",
                    parents: "5eb2e82f8b7bc517817af507",
                    offspring: "5eb2e82f8b7bc517817af509",
                    __v: 0
                }
            ],
            numAnimals: "loading"
        });
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.props.barns !== prevProps.barns) {
            const barn = this.props.barns[this.ids("barn")]
            const pres = this.props.presets[this.ids("preset")]
            this.setState({
                name: barn.name,
                products:pres.products.length?pres.products.map((prod,index)=>{return {name:prod.name}}):[{name:"no produce"}],
                animalInstances: prevState.animalInstances,
                avgWeight: 0,
                numAnimals: barn.animals.length,
                description: barn.description
            })
        }
    }
    render() {
        const url = "/home/farms/" + String(this.ids("farm")) + "/" + String(this.ids("preset")) + "/" + String(this.ids("barn")) + "/";
        const animalInstances = this.state.animalInstances.map((a, index) =>
            <Instance
                link={url.concat(index)}
                index={index}
                id={a.attributes.find(el => el.name === "id").value}
                gender={a.attributes.find(el => el.name === "gender").value}
                att1={(a.attributes.length >= 3) ? a.attributes.filter((e) => e.name !== "id" && e.name !== "gender")[0].value: "..."}
                att2={(a.attributes.length > 3) ? a.attributes.filter((e) => e.name !== "id" && e.name !== "gender")[1].value: "..."}
                alert={a.alerts.length ? "Yes" : "No"}
            />
        );
        let products = "";
        this.state.products.forEach(element => products = products.concat(element.name + " ,"));
        products = products.substring(0, products.length - 2);
        console.log("Props:", this.props.barns);
        return (
            <div>
                <div className="farm-main-container">
                    <div className="inner-main-container pt-2 pb-2">
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faTrashAlt} size="2x" />
                        </Link>
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faBars} size="2x" />
                        </Link>
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faPen} size="2x" />
                        </Link>
                        <Link to={url+"create-instance"}>
                            <FontAwesomeIcon className="top-icon" icon={faPlusCircle} size="2x" />
                        </Link>
                        <p className="farm-name">{this.state.name}</p>
                        <div>
                            <FontAwesomeIcon className="farm-icon" icon={faBalanceScale} size="2x" />
                            <p className="farm-text">{this.state.avgWeight} kg</p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="farm-icon-ex" icon={faHandPointRight} />
                            <p className="farm-text">{this.state.numAnimals}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="farm-icon-ex" icon={faHandPointRight} />
                            <p className="farm-text">{this.state.description}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="farm-icon" icon={faBoxOpen} size="2x" />
                            <p className="farm-text">{products}</p>
                        </div>
                    </div>
                </div>
                <Table className="instance-table" responsive>
                    <thead>
                        <tr>
                            <th>Tag ID</th>
                            <th>Gender</th>
                            <th>Attribute 1</th>
                            <th>Attribute 2</th>
                            <th>Any Alerts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animalInstances}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms,
    presets:state.presetReducer.presets,
    barns:state.barnReducer.barns
});
export default connect(
    mapStateToProps,
    { getBarnDetail }
)(withRouter(AnimalInstance));