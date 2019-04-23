import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import helpers from "./Shared/helpers";
import PartListPartInfoModal from "/src/Scenes/PartListView/PartListPartInfoModal";
import PartListModalColorInfo from "/src/Scenes/PartListView/PartListModalColorInfo";
import StoreViewPartImage from "/src/Scenes/StoreView/StoreViewPartImage";
import {
    MDBCol,
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
    MDBSelect,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBInput
} from "mdbreact";

export default class SetsImportModal extends Component {
    constructor(props) {
        super(props);
        this.createLocation = this.createLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            SetCode: ""
        };
    }

    toggle = nr => () => {
        this.setState({
            modal: !this.state.modal,
            SetCode: ""
        });
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    createLocation() {
        console.log({ SetCode: this.state.SetCode });
        helpers.postHelperNoAuth("fetchSet", { SetCode: this.state.SetCode }, () => {
            this.setState({
                modal: false
            });
            this.props.update();
        });
    }

    render() {
        return (
            <>
                <MDBBtn color="green" size="sm" onClick={this.toggle(4)} className="actionButton">
                    <i className="fa fa-download" /> Import a Set
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(4)} size="s">
                    <MDBModalHeader toggle={this.toggle(4)}>Import a Set</MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <MDBInput id="SetCode" label="Set Code" group type="text" onChange={this.handleChange} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(4)}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.createLocation}>
                            Import
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}
