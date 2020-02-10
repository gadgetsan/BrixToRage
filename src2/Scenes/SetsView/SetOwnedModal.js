import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import StoreViewPartImage from "../../Scenes/StoreView/StoreViewPartImage";
import Select from "react-select";
import {
    MDBInput,
    MDBRow,
    MDBCard,
    MDBCardHeader,
    MDBBtn,
    MDBCardBody,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBSelect
} from "mdbreact";

export default class SetOwnedModal extends Component {
    constructor(props) {
        super(props);
        this.ownershipUpdate = this.ownershipUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            isLoading: true
        };
    }

    toggle = nr => () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    ownershipUpdate() {
        helpers.postHelper("updateSetQt", { setId: this.props.set.Id, quantity: this.state.quantity }, () => {
            console.dir(this.props.update);
            this.props.update();
            this.setState({
                modal: false
            });
        });
    }

    render() {
        return (
            <>
                <MDBBtn color="primary" size="sm" onClick={this.toggle(2)}>
                    <i className="fa fa-edit" />
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(2)}>
                    <MDBModalHeader toggle={this.toggle(2)}>Set quantity owned for Set #{this.props.rebrickableId}</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput id="quantity" onChange={this.handleChange} label="Quantity Owned" />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.ownershipUpdate}>
                            Update Ownership
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}
