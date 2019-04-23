import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import helpers from "/src/Shared/helpers";
import PartListPartInfoModal from "/src/Scenes/PartListView/PartListPartInfoModal";
import StoreLocEditNameModal from "/src/Scenes/StoreLocView/StoreLocEditNameModal";
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
    MDBCardText
} from "mdbreact";

export default class StoreLocInfoModal extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.state = {
            modal: false,
            partData: null,
            colorData: null,
            loading: true,
            loadingColors: true,
            once: true
        };
    }

    toggle = nr => () => {
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.once || this.state.partData == null) {
            this.state.once = false;
            this.fetchData();
        }
    };

    fetchData(cb) {
        helpers.fetchHelperWithData("getLocation", { LocationCode: this.props.location.LocationCode }, locationData => {
            console.dir(locationData);
            this.setState({
                loading: false,
                locationData: locationData
            });
            if (cb) {
                cb();
            }
        });
    }

    updateLocation(newLocation, partId, cb) {
        this.fetchData(cb);
    }

    render() {
        return (
            <>
                <MDBBtn color="primary" size="sm" onClick={this.toggle(4)} className="actionButton">
                    <i className="fa fa-ellipsis-h" />
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(4)} size="lg">
                    <MDBModalHeader toggle={this.toggle(4)}>Information for {this.props.location.Name}</MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <strong>Name: </strong> {this.props.location.Name} <StoreLocEditNameModal location={this.props.location} update={this.props.update} />
                        <br />
                        <strong>Quantity: </strong> {this.props.location.TotalQuantity}
                        <br />
                        <strong>Parts Contained:</strong>
                        <br />
                        {this.state.loading ? (
                            <p>loading...</p>
                        ) : (
                            <MDBRow>
                                {this.state.locationData.map(locationPart => (
                                    <MDBCol size="3">
                                        <MDBCard>
                                            <MDBCardImage className="img-fluid" src={locationPart.RebrickableImageUrl} waves />
                                            <MDBCardBody>
                                                <MDBCardText>
                                                    <strong>{locationPart.Name}</strong>
                                                    <br />#{locationPart.RebrickableId}
                                                    <br />
                                                    <small>{locationPart.TotalQuantity} pièces</small>{" "}
                                                    <PartListPartInfoModal part={locationPart} update={this.fetchData} locationUpdate={this.updateLocation} />
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                ))}
                            </MDBRow>
                        )}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(4)}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}
