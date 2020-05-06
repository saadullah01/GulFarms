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
            <td>{props.att3}</td>
            <td>
                <Link to={props.link}>
                    <FontAwesomeIcon icon={faAngleRight} size="lg" />
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
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
                },
                {
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
                },
                {
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
                },
                {
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
                },
                {
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
                },
                {
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
                },
                {
                    id: 1,
                    type: "Cow",
                    breed: "Unknown",
                    weight: 70,
                    exProd1: "Milk",
                    exProd2: "Offspring",
                    exProd3: "..."
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
                id={a.id}
                gender={a.gender}
                att1={a.attribute[0]}
                att2={a.attribute[1]}
                att3={a.attribute[2]}
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
                            <th>Expected Product 1</th>
                            <th>Expected Product 2</th>
                            <th>Expected Product 3</th>
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