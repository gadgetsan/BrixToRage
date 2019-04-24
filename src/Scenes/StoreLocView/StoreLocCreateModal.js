import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import PartListPartInfoModal from "../../Scenes/PartListView/PartListPartInfoModal";
import PartListModalColorInfo from "../../Scenes/PartListView/PartListModalColorInfo";
import StoreViewPartImage from "../../Scenes/StoreView/StoreViewPartImage";
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

export default class StoreLocCreateModal extends Component {
    constructor(props) {
        super(props);
        this.createLocation = this.createLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            LocationName: "",
            LocationCode: "",
            LocationType: ""
        };
    }

    toggle = nr => () => {
        this.setState({
            modal: !this.state.modal,
            LocationName: "",
            LocationCode: "",
            LocationType: ""
        });
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    createLocation() {
        //console.log({ locationCode: this.state.LocationCode, locationName: this.state.LocationName });
        helpers.postHelper(
            "createLocation",
            { locationCode: this.state.LocationCode, locationName: this.state.LocationName, locationType: this.state.LocationType },
            () => {
                this.setState({
                    modal: false
                });
            }
        );
    }

    render() {
        return (
            <>
                <MDBBtn color="green" size="sm" onClick={this.toggle(4)} className="actionButton">
                    <i className="fa fa-asterisk" /> Create a new Location
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(4)} size="s">
                    <MDBModalHeader toggle={this.toggle(4)}>Create a new Location</MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <MDBInput id="LocationCode" label="Location Code (Can't be changed)" group type="text" onChange={this.handleChange} />
                        <MDBInput id="LocationName" label="Location Name" group type="text" onChange={this.handleChange} />
                        <MDBInput id="LocationType" label="Type d'emplacement (S, M ou L (Ou XL))" group type="text" onChange={this.handleChange} />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(4)}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.createLocation}>
                            Create
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}
