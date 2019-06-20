import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import helpers from "../../Shared/helpers";
import PartListPartInfoModal from "../../Scenes/PartListView/PartListPartInfoModal";
import StoreLocEditNameModal from "../../Scenes/StoreLocView/StoreLocEditNameModal";
import PartListModalColorInfo from "../../Scenes/PartListView/PartListModalColorInfo";
import StoreViewPartImage from "../../Scenes/StoreView/StoreViewPartImage";
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

export default class SetsPartList extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            loading: false,
            setData: []
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

    render() {
        return (
            <>
                <strong>Parts Inventory:</strong>
                <br />
                <MDBBtn size="sm" onClick={this.fetchData}>
                    Load Inventory
                </MDBBtn>
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
                                    <PartListModalColorInfo key={setPart.Id} color={setPart} fetchColorInfo={this.props.fetchColorInfo} />
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
                                <PartListPartInfoModal key={setPart.Id} part={setPart} update={this.fetchData} locationUpdate={this.props.updateLocation} />
                            </MDBCol>
                        ))}
                    </MDBRow>
                )}
            </>
        );
    }
}
