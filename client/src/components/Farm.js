import React, { Component } from 'react';
import {
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Tab from './sub_components/Tab';
import CreateFarm from './CreateFarm';

class Farm extends Component{
    constructor (props) {
        super(props);
        this.state = {
            id: null,
            name: "",
            location: ""
        }
    }
    addNew = () => {
        this.setState(this.state.form = <CreateFarm/>)
    }
    render() {
        return (
            <div className="main-container">
                Farm 1
            </div>
        );
    }
}

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
