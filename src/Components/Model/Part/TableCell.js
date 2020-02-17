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
                    padding: "0px"
                }}
            >
                <img
                    className="img-fluid"
                    src={this.props.item.RebrickableImageUrl}
                    alt="the brick"
                />
                <div
                    style={{
                        width: "100%",
                        fontSize: "12px",
                        textAlign: "center",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        margin: "0px",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                    }}
                >
                    <DetailsModal
                        title={"part #" + this.props.item.RebrickableId}
                        id={this.props.item.id}
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
                    {this.props.quantity}x #{this.props.item.RebrickableId}
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
                        fontSize: "10px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        margin: "0px"
                    }}
                >
                    {this.props.item.Name}
                </div>
            </MDBCol>
        );
    }
}
