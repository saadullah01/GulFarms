import React, { Component } from 'react';
import {
} from 'reactstrap';
import Tab from './sub_components/Tab';

class Landing extends Component{
    constructor (props) {
        super(props);
        console.log(props.children);
    }
    render() {
        return (
            <div className="main-container row mt-4">
                { this.props.children }
                <Tab name="Farms" link="/home/farms" type="large" />
                <Tab name="Alerts" link="/home/alerts" type="large" />
                <Tab name="Finance" link="/home/finances" type="large" />
            </div>
        );
    }
}

export default Landing;
