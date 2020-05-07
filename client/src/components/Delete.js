import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    Table,
} from "reactstrap";
import {undoDelete,getDeleted} from "../actions/removeActions"
import { connect } from "react-redux";
import { Link, withRouter  } from 'react-router-dom';
class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delArr: []
        }
    }
    componentDidMount() {
        this.props.getDeleted()
        this.setState({
            delArr: [
                {
                    name: "loading",
                    removalComment: "loading"
                }
            ]
        });
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.props.removed !== prevProps.removed) {
            this.setState({
               delArr:[...this.props.removed]
            })
        }
    }
    remove = index => {
        this.props.undoDelete(index)
    }
    render() {
        const delElements = this.state.delArr.map((e, i) =>
            <tr>
                <td>{e.name}</td>
                <td>{e.removalComment}</td>
                <td>
                    <Button 
                    onClick={() => this.remove(i)}
                    style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        borderRadius: "15px"
                    }}>
                        Restore
                    </Button>
                </td>
            </tr>
        );
        return (
            <div style={{ width: "90%", margin: "0 auto" }}>
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>description</th>
                        <th></th>
                    </thead>
                    <tbody>
                        { delElements }
                    </tbody>
                </Table>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loggedIn: state.authReducer.islogged,
    errors: state.errorReducer.errors,
    farms: state.farmReducer.farms,
    presets:state.presetReducer.presets,
    barns:state.barnReducer.barns,
    removed:state.removeReducer.removed
});
export default connect(
    mapStateToProps,
    { undoDelete,getDeleted }
)(withRouter(Delete));