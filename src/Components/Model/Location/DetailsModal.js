import React, { Component } from "react";
import { MDBRow } from "mdbreact";

import { mapIfLoaded } from "Shared/helpers";
import PartTableCell from "Components/Model/Part/TableCell";

export default class LocationDetailsModal extends Component {
    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <br />
                <strong>Name: </strong>
                {this.props.item.Name}
                <br />
                <MDBRow>
                    {mapIfLoaded(this.props.item.Parts, part => {
                        return (
                            <PartTableCell
                                key={part.id}
                                item={part}
                                quantity={part.PartColor.reduce(
                                    (acc, partColor) =>
                                        acc +
                                        partColor.parts_locations.reduce(
                                            (acc, location) =>
                                                acc + location.Quantity,
                                            0
                                        ),
                                    0
                                )}
                            />
                        );
                    })}
                </MDBRow>
            </div>
        );
    }
}
