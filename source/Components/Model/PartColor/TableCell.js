import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { getContrastYIQ } from "/source/Shared/helpers";

import { mapIfLoaded } from "/source/Shared/helpers";
import LocationInlineDisplay from "/source/Components/Model/Location/Inline";
import ChangeLocation from "/source/Components/Action/ChangeLocation";

import DetailsModal from "/source/Components/Presentation/Shared/DetailsModal";
import PartDetailsModal from "/source/Components/Model/Part/DetailsModal";

export default class TableCell extends Component {
    constructor(props) {
        super(props);
        if ((this, this.props.item.Part === undefined)) {
            this.props.item.Part = { RebrickableId: "?????" };
        }
        if (this.props.item.Color === undefined) {
            console.log(this.props.item);
            this.props.item.Color = { Hex: "FFFFFF" };
        }
        this.Color = this.props.item.Color;
        this.linked = this.props.item[this.props.link];
    }
    render() {
        return (
            <MDBCol
                md="1"
                sm="4"
                style={{
                    border: "solid 1px black",
                    margin: "0px",
                    padding: "0px",
                    backgroundColor: "#" + this.Color.Hex,
                    color: getContrastYIQ(this.Color.Hex)
                }}
            >
                <img
                    className="img-fluid"
                    src={this.props.item.ImageURL}
                    alt="the brick"
                />
                <div
                    style={{
                        width: "100%",
                        fontSize: "14px",
                        textAlign: "center",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        margin: "0px",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    }}
                >
                    {this.linked.Quantity}x #
                    {this.props.item.Part.RebrickableId}
                    <DetailsModal
                        title={"part #" + this.props.item.Part.RebrickableId}
                        id={this.props.item.Part.id}
                        type="part"
                        size="lg"
                        customButton={
                            <a>
                                {" "}
                                <i className="fa fa-info" />
                            </a>
                        }
                    >
                        <PartDetailsModal />{" "}
                    </DetailsModal>
                </div>
                <div
                    style={{
                        width: "100%",
                        fontsize: "10px",
                        textAlign: "center",
                        fontWeight: "bold",
                        margin: "0px"
                    }}
                />
                <div
                    style={{
                        width: "100%",
                        fontSize: "14px",
                        textAlign: "center",
                        margin: "0px"
                    }}
                >
                    {mapIfLoaded(
                        this.props.item.PartLocations,
                        partLocation => {
                            return (
                                <LocationInlineDisplay
                                    key={partLocation.Location.id}
                                    location={partLocation.Location}
                                    hideName={true}
                                />
                            );
                        },
                        "None"
                    )}

                    <ChangeLocation
                        part={this.props.item.Part}
                        customButton={
                            <a>
                                {" "}
                                <i className="fa fa-pen" />
                            </a>
                        }
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        fontSize: "10px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        margin: "0px"
                    }}
                >
                    {this.props.item.Part.Name}
                </div>
            </MDBCol>
        );
    }
}
