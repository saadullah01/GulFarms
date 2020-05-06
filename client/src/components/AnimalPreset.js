import React, { Component } from 'react';
import { useLocation, Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import {getPresetDetail} from "../actions/presetActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBalanceScale,
    faHandPointRight,
    faBoxOpen,
    faPen,
    faBars,
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

import Tab from './sub_components/Tab';
// import CreateAnimalPreset from './CreateNewAnimal';

class AnimalPreset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            attributes: [],
            products: [],
            barns: [],
            avgWeight: null,
            numAnimals: null
        }
    }
    ids(name){
        const dic ={
        farmId:this.props.match.params.fid,
        presetId:this.props.match.params.pid
        }
        return dic[name]
    }
    componentDidMount() {
        if(this.props.farms.length <= this.ids("farmId") ||this.props.presets.length <= this.ids("presetId") ){
            this.props.history.push("/home/farms");
            return
        }
        else{
            this.props.getPresetDetail(this.ids("presetId"))
        }
        /* Dummy Animal Preset */
        this.setState(state=>({
            ...state,
            name: "loading...",
            attributes: [],
            products: [
                {name: "loading.."},
                {name: "loading.."},
                {name: "loading.."}
            ],
            avgWeight: 40,
            numAnimals: 300,
            barns: [
                {id: 1, name: "loading.."}
            ]
        }));
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.props.presets !== prevProps.presets) {
            this.setState(state=>({
                ...state,
                name: this.props.presets[this.ids("presetId")].name,
                attributes: [],
                products: [
                    {name: "Milk"},
                    {name: "Wool"},
                    {name: "Offspring"}
                ],
                avgWeight: 40,
                numAnimals: 300,
                barns: [
                    {id: 1, name: "Barn1"},
                    {id: 2, name: "Barn2"}
                ]
            }));
        }
    }
    render() {
        const url = "/home/farms/"+String(this.ids("farmId"))+"/"+String(this.ids("presetId"));
        console.log("URLSfarm: " ,this.ids("farmId"), " presetid: ",this.ids("presetId"), "urlfarm: ")
        
        const barns = this.state.barns.map((barn, index) =>
            <Tab name={barn.name}  key={barn.id} link={url.concat("/"+index.toString())} type="small" />
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
                    <Link to={url+"/create-barn"} returnTo={url} className="tab-small">
                        <p className="tab-add"><FontAwesomeIcon icon={faPlusCircle} /></p>
                    </Link>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms,
    presets:state.presetReducer.presets
});
export default connect(
    mapStateToProps,
    { getPresetDetail }
)(withRouter(AnimalPreset));

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
