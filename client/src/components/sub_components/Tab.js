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
    goTo = () => {
        var tab = document.getElementById(this.state.name);
        tab.style.backgroundColor = "white";
        tab.style.color = "green";
    }
    render() {
        return (
            <Link to={this.state.link}>
                <div id={this.state.name} className={"tab-".concat(this.state.type)} onClick={this.goTo}>
                    <p className="tab-text">{this.state.name}</p>
                </div>
            </Link>
        );
    }
}

export default Tab;