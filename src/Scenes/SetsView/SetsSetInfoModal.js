import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import helpers from "./Shared/helpers";
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

export default class SetsSetInfoModal extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.fetchMissingPart = this.fetchMissingPart.bind(this);
        this.state = {
            modal: false,
            partData: null,
            colorData: null,
            loading: true,
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
        helpers.fetchHelperWithData("getSet", { rebrickableId: this.props.set.RebrickableId }, setData => {
            console.dir(setData);
            this.setState({
                loading: false,
                setData: setData
            });
            if (cb) {
                cb();
            }
        });
    }

    updateLocation(newLocation, partId, cb) {
        this.fetchData(function() {
            return;
        });
        //on n'attend pas la fin du fetch parce que sinon c'est trop long...
        cb();
    }

    fetchMissingPart() {
        this.setState({
            loading: true
        });
        this.state.setData.map(part => {
            if (!part.Name) {
                //si la piece ne possède pas de nom, on veux la fetcher
                helpers.fetchHelperWithData("getPart", { rebrickableId: part.RebrickableId }, partData => {
                    return;
                });
                console.dir(part);
            }
        });
        this.fetchData(function() {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <>
                <MDBBtn color="primary" size="sm" onClick={this.toggle(4)} className="actionButton">
                    <i className="fa fa-ellipsis-h" />
                </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle(4)} size="lg" size="fluid">
                    <MDBModalHeader toggle={this.toggle(4)}>Information for {this.props.set.Name}</MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <strong>Name: </strong> {this.props.set.Name}
                        <br />
                        <strong>Year: </strong> {this.props.set.Year}
                        <br />
                        <strong>Owned: </strong> {this.props.set.isOwned ? this.props.set.quantity : "No"}
                        <br />
                        <strong>In Inventory?: </strong> {this.props.set.inInventory ? "yes" : "No"}
                        <br />
                        <MDBBtn size="sm" onClick={this.fetchMissingPart}>
                            Fetch missing Part Info
                        </MDBBtn>
                        <br />
                        <strong>Parts Inventory:</strong>
                        <br />
                        {this.state.loading ? (
                            <p>loading...</p>
                        ) : (
                            <MDBRow>
                                {this.state.setData.map(setPart => (
                                    <MDBCol md="1" sm="4" key={setPart.Id} style={{ border: "solid 1px black", margin: "0px", padding: "0px" }}>
                                        <img className="img-fluid" src={setPart.RebrickableImageUrl} />
                                        <div
                                            style={{
                                                width: "100%",
                                                "font-size": "14px",
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                margin: "0px"
                                            }}
                                        >
                                            #{setPart.RebrickableId}
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                "font-size": "10px",
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                margin: "0px"
                                            }}
                                        >
                                            <PartListModalColorInfo key={setPart.Id} color={setPart} fetchColorInfo={this.fetchColorInfo} />
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                "font-size": "14px",
                                                "text-align": "center",
                                                margin: "0px"
                                            }}
                                        >
                                            Loc.: {setPart.LocationCode}
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                "font-size": "10px",
                                                "text-align": "center",
                                                "white-space": "nowrap",
                                                "text-overflow": "ellipsis",
                                                overflow: "hidden",
                                                margin: "0px"
                                            }}
                                        >
                                            {setPart.Name}
                                        </div>
                                        <PartListPartInfoModal key={setPart.Id} part={setPart} update={this.fetchData} locationUpdate={this.updateLocation} />
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
