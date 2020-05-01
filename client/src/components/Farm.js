import React, { Component } from 'react'; 
import { useLocation } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// import Tab from './sub_components/Tab';
// import CreateFarm from './CreateFarm';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

class Farm extends Component {
    state = {
        id: null,
        name: "",
        location: "",
        description: "",
        animalPresets: [],
        alerts: []
    }
    render() {
        let query = useQuery();
        this.setState({
            id: query.get("farm_id"),
            name: "Farm 1",
            location: "Lahore",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            animalPresets: [
                {'id': 1, 'name': "Sheep"},
                {'id': 2, 'name': "Cow"}
            ]
            // ,alerts: [
            //     {
            //         name: "Milk Alert",
            //         description: "Every 24 hours alert",
            //         duration: 24,
            //         durationType: "hour"
            //     },
            //     {
            //         name: "Wool Alert",
            //         description: "Every 1 month alert",
            //         duration: 1,
            //         durationType: "month"
            //     }
            // ]
        });
        return (
            <div className="main-container">Farm</div>
        )
    }
};

// class Farm extends Component{
//     constructor (props) {
//         super(props);
//         this.state = {
//             id: null,
//             name: "",
//             location: ""
//         }
//     }
//     render() {
//         return (
//             <div className="main-container">
//                 <p>Farm ID: { this.state.id }</p>
//                 <p>Farm Name: { this.state.name }</p>
//                 <p>Farm Location: { this.state.location }</p>
//             </div>
//         );
//     }
// }

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
