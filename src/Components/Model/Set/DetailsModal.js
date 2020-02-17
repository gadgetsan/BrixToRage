import React, { Component } from "react";
import { MDBRow } from "mdbreact";

import { mapIfLoaded } from "Shared/helpers";

import PartColorTableCell from "Components/Model/PartColor/TableCell";
import ChangeQuantity from "Components/Action/ChangeQuantity";

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
                <strong>Quantity Owned: </strong>
                {this.props.item.sets_users.length > 0
                    ? this.props.item.sets_users[0].Quantity
                    : 0}
                <ChangeQuantity
                    set={this.props.item}
                    quantity={
                        this.props.item.sets_users.length > 0
                            ? this.props.item.sets_users[0].Quantity
                            : 0
                    }
                    customButton={
                        <a>
                            {" "}
                            <i className="fa fa-pen" />
                        </a>
                    }
                />
                <br />
                <strong>Built: </strong>
                {this.props.item.sets_users.length > 0 &&
                this.props.item.sets_users[0].isBuilt
                    ? "Yes"
                    : "No"}
                <br />
                <MDBRow>
                    {mapIfLoaded(sortedPart, partColor => {
                        return (
                            <PartColorTableCell
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
