import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import PartListPartInfoModal from "../../Scenes/PartListView/PartListPartInfoModal";
import StoreLocEditNameModal from "../../Scenes/StoreLocView/StoreLocEditNameModal";
import PartListModalColorInfo from "../../Scenes/PartListView/PartListModalColorInfo";
import SetsPartList from "../../Scenes/SetsView/SetsPartList";
import {
    MDBCol,
    MDBRow,
    MDBNav,
    MDBNavItem,
    MDBBtn,
    MDBNavLink,
    MDBIcon,
    MDBTabContent,
    MDBTabPane,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBContainer,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText
} from "mdbreact";
import SetOwnedModal from "./SetOwnedModal";

export default class SetsSetInfoModal extends Component {
    constructor(props) {
        super(props);
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
        }
    };

    updateLocation(newLocation, partId, cb) {
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
        this.setState({
            loading: false
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
                        <SetOwnedModal set={this.props.set} update={this.props.update} />
                        <br />
                        <strong>In Inventory?: </strong> {this.props.set.inInventory ? "yes" : "No"}
                        <br />
                        <MDBBtn size="sm" onClick={this.fetchMissingPart}>
                            Fetch missing Part Info
                        </MDBBtn>
                        <br />
                        <SetsPartList set={this.props.set} updateLocation={this.updateLocation} />
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
