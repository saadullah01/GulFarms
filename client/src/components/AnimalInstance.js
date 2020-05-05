import React, { Component } from 'react';

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
        /* Dummy Animal Preset */
        this.setState({
            farmID: 1, // ARHAM you have to send it by props to this component
            presetID: 1,
            barnID: 1,
            name: "Barn 1",
            products: [
                {name: "Milk"},
                {name: "Wool"},
                {name: "Offspring"}
            ],
            avgWeight: 40,
            numAnimals: this.state.animalInstances.length,
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
            ]
        });
    }
    render() {
        const url = "/home/farms/"+String(this.state.farmID)+"/"+String(this.state.presetID)+"/"+String(this.state.barnID);
        const animalInstances = this.state.animalInstances.map((a, index) =>
            
        );
        let products = "";
        this.state.products.forEach(element => products = products.concat(element.name+" ,"));
        products = products.substring(0, products.length-2);
        return (
            <div className="farm-back">
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
                            <FontAwesomeIcon className="farm-icon" icon={faBoxOpen} size="2x" />
                            <p className="farm-text">{products}</p>
                        </div>
                    </div>
                </div>
                <div className="inner-main-container row pt-2 pb-2">
                    { barns }
                    <Link to={url+"/create-barn"} className="tab-small">
                        <p className="tab-add"><FontAwesomeIcon icon={faPlusCircle} /></p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AnimalInstance;