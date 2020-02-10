import React, { Component } from "react";
import { MDBRow } from "mdbreact";

import { mapIfLoaded } from "Shared/helpers";

import PartTableCell from "Components/Model/PartColor/TableCell";

export default class PartDetailsModal extends Component {
    render() {
        var sortedPart = this.props.item.Parts.sort((a, b) => {
            if (a.sets_parts.colorId > b.sets_parts.colorId) {
                return -1;
            }
            if (b.sets_parts.colorId > a.sets_parts.colorId) {
                return 1;
            }
            return 0;
        });
        return (
            <div style={{ textAlign: "left" }}>
                <img
                    alt="the brick"
                    src={this.props.item.ImageURL}
                    width="100%"
                />
                <br />
                <strong>Name: </strong>
                {this.props.item.Name}
                <br />
                <strong>Quantity: </strong>???
                <br />
                <strong>Years: </strong>???
                <br />
                <MDBRow>
                    {mapIfLoaded(sortedPart, partColor => {
                        return (
                            <PartTableCell
                                key={partColor.id}
                                item={partColor}
                                link="sets_parts"
                            />
                        );
                    })}
                </MDBRow>
            </div>
        );
    }
}
