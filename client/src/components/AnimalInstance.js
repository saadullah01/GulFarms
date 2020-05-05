import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Table
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBalanceScale,
    faHandPointRight,
    faBoxOpen,
    faPen,
    faBars,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';

function Instance(props) {
    const color = (props.index % 2) ? "#e6ffee" : "#80ffaa";
    return (
        <tr style={{ "background-color": color }}>
            <td>{props.id}</td>
            <td>{props.type}</td>
            <td>{props.breed}</td>
            <td>{props.weight}</td>
            <td>{props.exProd1}</td>
            <td>{props.exProd2}</td>
            <td>
                {props.exProd3}
                <Link to={props.link}>
                    <FontAwesomeIcon className="end-link" icon={faAngleRight} size="lg" />
                </Link>    
            </td>
        </tr>
    );
}

class AnimalInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barnID: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            farmID: null,
            presetID: null,
            name: "",
            products: [],
            animalInstances: [],
            avgWeight: null,
            numAnimals: null,
            typesOfAnimals: null
        }
    }
    componentDidMount() {
        // if(this.props.farms.length <= this.state.id){
        //     this.props.history.push("/home/farms");
        //     return
        // }
        // else{
        //     this.props.getFarmDetail(this.state.id)
        // }
        /* Dummy Animal Instance */
        this.setState({
            farmID: 1, // ARHAM you have to send it by props to this component
            presetID: 1,
            barnID: 1,
            name: "Barn 1",
            products: [
                { name: "Milk" },
                { name: "Wool" },
                { name: "Offspring" }
            ],
            avgWeight: 40,
            typesOfAnimals: 1,
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
            numAnimals: 0
        });
    }
    render() {
        const url = "/home/farms/" + String(this.state.farmID) + "/" + String(this.state.presetID) + "/" + String(this.state.barnID) + "/";
        const animalInstances = this.state.animalInstances.map((a, index) =>
            <Instance 
                link={ url.concat(index) }
                index={ index }
                id={ a.id }
                type={ a.type }
                breed={ a.breed }
                weight={ a.weight }
                exProd1={ a.exProd1 }   
                exProd2={ a.exProd2 }   
                exProd3={ a.exProd3 }  
            />
        );
        let products = "";
        this.state.products.forEach(element => products = products.concat(element.name + " ,"));
        products = products.substring(0, products.length - 2);
        return (
            <div>
                <div className="farm-main-container">
                    <div className="inner-main-container pt-2 pb-2">
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faBars} size="2x" />
                        </Link>
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={faPen} size="2x" />
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
                            <p className="farm-text">{this.state.typesOfAnimals}</p>
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
                            <th>ID</th>
                            <th>Type</th>
                            <th>Breed</th>
                            <th>Weight</th>
                            <th>Expected Product 1</th>
                            <th>Expected Product 2</th>
                            <th>Expected Product 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        { animalInstances }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AnimalInstance;