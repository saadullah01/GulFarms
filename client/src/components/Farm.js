import React, { Component } from 'react'; 
import { useLocation, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faMapMarkerAlt, 
    faClipboard, 
    faPen,
    faBars,
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

import Tab from './sub_components/Tab';
import CreateAnimalPreset from './CreateNewAnimal';

class Farm extends Component {
    state = {
        id: null,
        name: "",
        location: "",
        description: "",
        animalPresets: [],
        alerts: []
    }
    componentDidMount() {
        const farmID = window.location.href.substring( window.location.href.lastIndexOf('/') + 1)
        this.setState({
            id: parseInt(farmID),
            name: "Farm 1",
            location: "Lahore",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            animalPresets: [
                {'id': 1, 'name': "Sheep"},
                {'id': 2, 'name': "Cow"}
            ],
            alerts: []
        });
    }
    render() {
        const url = "/home/farms/";
        const urlTab = "/home/farms?preset_id=";
        const animalPresets = this.state.animalPresets.map((preset, index) => 
            <Tab name={ preset.name } key={ preset.id } link={ urlTab.concat(index.toString()) } type="small" />
        );
        return (
            <div className="farm-back">
                <div className="farm-main-container">
                    <div className="inner-main-container pt-2 pb-2">
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={ faBars } size="2x" />
                        </Link>
                        <Link to="#">
                            <FontAwesomeIcon className="top-icon" icon={ faPen } size="2x" />
                        </Link>
                        <p className="farm-name">{ this.state.name }</p>
                        <div>
                            <FontAwesomeIcon className="farm-icon" icon={ faMapMarkerAlt } size="2x" />
                            <p className="farm-text">{ this.state.location }</p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="farm-icon" icon={ faClipboard } size="2x" />
                            <p className="farm-text">{ this.state.description }</p>
                        </div>
                    </div>
                </div>
                <div className="inner-main-container row pt-2 pb-2">
                    { animalPresets }
                    <Link to={url+"create-preset"} className="tab-small">
                        <p className="tab-add"><FontAwesomeIcon icon={ faPlusCircle } /></p>
                    </Link>
                </div>
            </div>
        )
    }
};

export default Farm;

///DONT DELETE THIS


// import React, { Component } from 'react';
// import {
// } from 'reactstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// import Tab from './sub_components/Tab';

// import {useSelector, useDispatch} from "react-redux"

// const Farm=()=>{
//     const state = useSelector(state => state["farmReducer"])
//     const url = "/home/farm/";
//     const farms = state.farms.map((farm) => 
//         <Tab key={farm.id} name={ farm['name'] } link={ url.concat(farm['id'].toString()) } type="small" />
//     );
//     return (
//         <div className="next-layer mt-4">
//             <div className="main-container row">
//                 { farms }
//                 <div className="small">
//                     <p className="tab-add"><FontAwesomeIcon icon={ faPlusCircle } /></p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Farm;
