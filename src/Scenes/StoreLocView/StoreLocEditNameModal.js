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

export default class StoreLocEditNameModal extends Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            LocationName: this.props.location.Name
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

    updateName() {
        console.log({ locationCode: this.props.location.LocationCode, newName: this.state.LocationName });
        helpers.postHelperNoAuth("updateLocationName", { locationCode: this.props.location.LocationCode, newName: this.state.LocationName }, () => {
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
                    <i className="fa fa-edit" />
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(4)} size="s">
                    <MDBModalHeader toggle={this.toggle(4)}>Update Name for this Location</MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <MDBInput id="LocationName" label="New Name" group type="text" onChange={this.handleChange} value={this.state.LocationName} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(4)}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.updateName}>
                            Update
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}
