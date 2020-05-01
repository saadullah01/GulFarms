import React, { Component } from 'react';
import { Link } from "react-router-dom"
import {
} from 'reactstrap';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            link: props.link,
            type: props.type
        }
    }
    changeColor = () => {
        var tab = document.getElementById(this.state.name);
        tab.style.backgroundColor = "white";
        tab.style.color = "green";
    }
    render() {
        return (
            <Link to={this.state.link} id={this.state.name} className={"tab-".concat(this.state.type)} onClick={this.changeColor}>
                <p className="tab-text">{this.state.name}</p>
            </Link>
        );
    }
}

export default Tab;