import React, { Component } from 'react';
import {
    Label,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

class Option extends Component {
    // Can Add Constructor
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            Opt: ""

        }
    }
    submitt = () => {
        this.props.update(this.state.data)
    }
    add = e => {

        this.setState(state => {

            const data = state.data.concat(state.Opt);
            return {
                data,
            };
        }, () => this.submitt()
        );
        this.resett()

    };
    resett = () => {
        this.setState({
            Opt: "",
        });
    };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    remove = d => {

        this.setState(state => {

            const data = state.data.filter((item, j) => d !== j)
            return {
                data,

            };
        }, () => this.submitt());
        this.resett()
    };
    display() {
        const values = this.state.data.map((d, index) => 
            <tr>
                <td>{d}</td>
                <td><FontAwesomeIcon color="#4caf50" onClick={() => this.remove(index)} icon={faTimes} /></td>
            </tr>
        );
        return (
            <Table responsive>
                <tbody>
                    {values}
                </tbody>
            </Table>
        );
        // return this.state.data.map((d, index) => {
        //     return (

        //         <Row key={index}>
        //             <FormGroup>
        //                 <Row>
        //                     <Col >
        //                         <Label className="text-label-b">{d}</Label>
        //                     </Col>
        //                     <Col>
        //                         <Button close onClick={() => this.remove(index)}>x</Button>
        //                     </Col>
        //                     <Col>
        //                     </Col>
        //                     <Col>
        //                     </Col>
        //                 </Row>
        //             </FormGroup>

        //         </Row>

        //     );
        // })
    }
    render() {
        return (
            < div className = "col-sm-3 pl-2" >
                { this.submitt }
                <Row>
                    <div className="col-sm-12">
                        <Input
                            className="input-field-ad"
                            type="text"
                            placeholder="Option"
                            onChange={this.onChange}
                            value={this.state.Opt}
                            id="Opt"
                        />
                    </div>
                    <div className="col-sm-12">
                        <Button
                            onClick={this.add} 
                            style={{
                                float: "right",
                                borderRadius: "20px",
                                backgroundColor: "#4caf50",
                                color: "white",
                                marginTop: "10px"
                            }}
                        ><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                    <div className="mt-3 col-sm-12">
                        { this.display() }
                    </div>
                </Row>
            </div >
        )
    }
}

export default Option;
