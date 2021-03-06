import React, { Component } from "react";

import DetailsModal from "Components/Presentation/Shared/DetailsModal";
import PartDetailsModal from "Components/Model/Part/DetailsModal";
import LocationInlineDisplay from "Components/Model/Location/Inline";

export default class PartTableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img
                        src={this.props.item.RebrickableImageUrl}
                        height="25"
                        target="_blank"
                        alt="the brick"
                    />
                </td>
                <td>{this.props.item.Name}</td>
                <td>
                    <a>{this.props.item.RebrickableId}</a>
                </td>
                <td>
                    {this.props.item.locations.map(location => {
                        return (
                            <LocationInlineDisplay
                                key={location.id}
                                location={location}
                            />
                        );
                    })}
                </td>
                <td>
                    {this.props.item.parts_colors.reduce((total, partColor) => {
                        return partColor.PartLocations
                            ? partColor.PartLocations.reduce(
                                  (total, partLocation) =>
                                      partLocation.Quantity + total,
                                  0
                              ) + total
                            : total;
                    }, 0)}
                </td>
                <td className="actionCell">
                    <DetailsModal
                        title={"part #" + this.props.item.RebrickableId}
                        id={this.props.item.id}
                        type="part"
                        size="lg"
                    >
                        <PartDetailsModal />{" "}
                    </DetailsModal>
                </td>
            </tr>
        );
    }
}
