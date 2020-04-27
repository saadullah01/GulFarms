import React, { Component } from 'react';
import {
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Tab from './sub_components/Tab';
import CreateFarm from './CreateFarm';

class FarmsList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            farms: [
                {'id': 1, 'name': "Farm 1"},
                {'id': 2, 'name': "Farm 2"}
            ],
            form: ''
        }
    }
    addNew = () => {
        this.setState(this.state.form = <CreateFarm/>)
    }
    render() {
        const url = "/farms/";
        const farms = this.state.farms.map((farm) => 
            <Tab name={ farm['name'] } link={ url.concat(farm['id'].toString()) } type="small" />
        );
        return (
            <div className="next-layer mt-4">
                <div className="main-container row">
                    { farms }
                    <div onClick={ this.addNew } className="small">
                        <p className="tab-add"><FontAwesomeIcon icon={ faPlusCircle } /></p>
                    </div>
                    { this.state.form }
                </div>
            </div>
        );
    }
}

export default FarmsList;

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
