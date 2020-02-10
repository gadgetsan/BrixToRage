import React, { Component } from "react";
import { MDBRow } from "mdbreact";

import { mapIfLoaded } from "Shared/helpers";
import PartTableCell from "Components/Model/PartColor/TableCell";

export default class LocationDetailsModal extends Component {
    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <br />
                <strong>Name: </strong>
                {this.props.item.Name}
                <br />
                <MDBRow>
                    {mapIfLoaded(this.props.item.PartColor, partColor => {
                        return (
                            <PartTableCell
                                key={partColor.id}
                                item={partColor}
                                link="parts_locations"
                            />
                        );
                    })}
                </MDBRow>
            </div>
        );
    }
}
