import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import helpers from "./Shared/helpers";
import StoreViewPartImage from "/src/Scenes/StoreView/StoreViewPartImage";
import Select from "react-select";
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
    MDBSelect
} from "mdbreact";

export default class PartListPartSetLocationModal extends Component {
    constructor(props) {
        super(props);
        this.locationUpdate = this.locationUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            locations: [],
            isLoading: true,
            newLocation: this.props.currentLocation
        };
    }

    toggle = nr => () => {
        if (this.state.locations.length < 1 || this.state.isLoading) {
            helpers.fetchHelperWithData("getLocations", { test: "test" }, locations => {
                this.setState({
                    locations: locations,
                    isLoading: false
                });
                //console.dir(locations);
            });
        }
        this.setState({
            modal: !this.state.modal
        });
    };

    handleChange(event) {
        console.dir(event);
        this.setState({ newLocation: event.LocationCode, newLocationName: event.Name });
    }

    locationUpdate() {
        helpers.postHelper("changePartLocation", { locationId: this.state.newLocation, rebrickableId: this.props.rebrickableId }, newLocationData => {
            this.props.locationUpdate(this.state.newLocation, this.props.rebrickableId, () => {
                this.setState({
                    modal: false
                });
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
                    <MDBModalHeader toggle={this.toggle(2)}>Add an emplacement for part #{this.props.rebrickableId}</MDBModalHeader>
                    <MDBModalBody>
                        <Select
                            onChange={this.handleChange}
                            options={this.state.locations}
                            isSearchable
                            isLoading={this.state.isLoading}
                            getOptionLabel={location => {
                                return location.Name + " (" + location.LocationCode + ")";
                            }}
                            getOptionValue={location => {
                                return location.LocationCode;
                            }}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.locationUpdate}>
                            Move to this location
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}
