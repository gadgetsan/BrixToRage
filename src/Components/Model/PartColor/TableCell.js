import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { getContrastYIQ } from "Shared/helpers";

import { mapIfLoaded } from "Shared/helpers";
import LocationInlineDisplay from "Components/Model/Location/Inline";
import ChangeLocation from "Components/Action/ChangeLocation";

import DetailsModal from "Components/Presentation/Shared/DetailsModal";
import PartDetailsModal from "Components/Model/Part/DetailsModal";

export default class TableCell extends Component {
    constructor(props) {
        super(props);
        this.Color = this.props.item[this.props.link].Color;
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
                <DetailsModal
                    title={"part #" + this.props.item.Part.RebrickableId}
                    id={this.props.item.Part.id}
                    type="part"
                    size="lg"
                    customButton={
                        <img
                            className="img-fluid"
                            style={{ cursor: "pointer" }}
                            src={this.props.item.ImageURL}
                            alt="the brick"
                        />
                    }
                >
                    <PartDetailsModal />{" "}
                </DetailsModal>
                <div
                    style={{
                        width: "100%",
                        fontSize: "10px",
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
                        fontSize: "12px",
                        textAlign: "center",
                        margin: "0px"
                    }}
                >
                    {mapIfLoaded(
                        this.props.item.PartLocations,
                        partLocation => {
                            return partLocation.Location ? (
                                <LocationInlineDisplay
                                    key={partLocation.Location.id}
                                    location={partLocation.Location}
                                    hideName={true}
                                />
                            ) : (
                                "None"
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
