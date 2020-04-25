import React, { Component } from 'react';
import {
    Row
} from 'reactstrap';
import Tab from './sub_components/Tab';

class Landing extends Component{
    render() {
        return (
            <div className="main-container row mt-4">
                <Tab name="Farms" link="/home/farms" type="large" />
                <Tab name="Alerts" link="/home/alerts" type="large" />
                <Tab name="Finance" link="/home/finance" type="large" />
            </div>
        );
    }
}

export default Landing;
