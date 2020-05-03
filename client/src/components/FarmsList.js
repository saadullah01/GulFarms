import React, { Component } from 'react';
import {
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Tab from './sub_components/Tab';

//redux
import { connect } from "react-redux"
import {getFarms} from "../actions/farmActions"
import { Link, withRouter } from "react-router-dom";

class FarmsList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            farms: this.props.farms,
            form: ''
        }
    }
    componentDidMount(){
        this.props.getFarms()
    }
    render() {
        const url = "/home/farms/";
        const urlTab = "/home/farms/";
        const farms = this.props.farms.map((farm,index) =>
            <Tab name={ farm.name } key={index} link={ urlTab.concat(index.toString()) } type="small" />
        );
        return (
            <div className="next-layer mt-4">
                <div className="main-container row">
                    { farms }
                    <Link to={url+"create-farm"} className="tab-small">
                        <p className="tab-add"><FontAwesomeIcon icon={ faPlusCircle } /></p>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms
});
export default connect(
    mapStateToProps,
    { getFarms }
)(withRouter(FarmsList));

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
